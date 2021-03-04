import { fabric } from 'fabric';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { IPathTarget } from '../../../interfaces/canvas-events/path-target';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { TypedPolygon, TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasHistoryState, REDO, UNDO } from '../reducers/undo-redo';
import {
  getPreviousBackground,
  getPreviousBackgroundDivColor,
} from './getPreviousBackground';
import { getStateVariables } from './getStateVariables';

/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
const isLocalObject = (id: string, canvasId: string): boolean => {
  if (!id) {
    return false;
  }

  const object = id.split(':');

  if (!object.length) {
    throw new Error('Invalid ID');
  }

  return object[0] === canvasId;
};

/**
 * Parses to an object the given state
 * @param {string} activeState - Stringified state to parse
 */
const mapActiveState = (activeState: string) =>
  JSON.parse(activeState).objects.map((object: TypedShape | TypedGroup) => {
    if ((object as TypedGroup).objects) {
      let _objects = (object as TypedGroup).objects;
      let mappedObjects = (_objects as TypedShape[]).map((o: TypedShape) => {
        return { ...o, fromJSON: true };
      });

      return { ...object, fromJSON: true, objects: mappedObjects };
    }
    return { ...object, fromJSON: true };
  });

/**
 * Loads the given objects in the whiteboard with the given instanceId
 * @param {fabric.Canvas} canvas - Canvas to set the objects.
 * @param {{ [key: string]: any }} mapped - Objects to set in canvas.
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state in canvas actions history
 * @param {string} action - Undo/Redo action made
 * @param {(color: string) => void} setBackgroundColorInCanvas - Function to
 * set background color in current canvas
 */
const loadFromJSON = (
  canvas: fabric.Canvas,
  mapped: { [key: string]: any },
  instanceId: string,
  state: CanvasHistoryState,
  action: 'UNDO' | 'REDO' | 'CANVAS_UNDO' | 'CANVAS_REDO',
  setBackgroundColorInCanvas: (color: string) => void,
  setLocalImage: (img: string | File) => void,
  setBackgroundImageIsPartialErasable: (state: boolean) => void
) => {
  const { currentEvent, nextEvent } = getStateVariables(state);

  canvas.loadFromJSON(JSON.stringify({ objects: mapped }), () => {
    canvas
      .getObjects()
      .forEach((o: TypedShape | TypedPolygon | TypedGroup | IPathTarget) => {
        if (isLocalObject(o.id as string, instanceId)) {
          (o as TypedShape).set({ selectable: true, evented: true });

          if ((o as TypedGroup)._objects && !(o as ICanvasBrush).basePath) {
            (o as TypedGroup).toActiveSelection();
            canvas.discardActiveObject();
          }
        }
      }); 

    if (state.backgrounds.length && state.activeStateIndex !== null) {
      let bgs = state.backgrounds.slice(0, state.activeStateIndex + 1); 
      let target = bgs.reverse().find((item: any) => item !== null);

      if (target && (target as ICanvasObject).backgroundImageEditable) {
        setBackgroundImageIsPartialErasable(true);
        fabric.Image.fromURL((target as ICanvasObject).src as string, function (img) {
          canvas?.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: (target as ICanvasObject).scaleX,
            scaleY: (target as ICanvasObject).scaleY,
            originX: 'left',
            originY: 'top',
            // @ts-ignore
            id: target.id,
          });

          canvas?.renderAll();
          canvas?.trigger('background:modified', img);
        });
      } else if (target && !(target as ICanvasObject).backgroundImageEditable) {
        setBackgroundImageIsPartialErasable(false);
        // @ts-ignore
        canvas?.setBackgroundImage(0, canvas.renderAll.bind(canvas));
        setLocalImage((target as ICanvasObject).backgroundImage as string);
        canvas?.trigger('background:modified', null);
      } else {
        setLocalImage('');
        canvas?.trigger('background:modified', null);
        // @ts-ignore
        canvas?.setBackgroundImage(0, canvas.renderAll.bind(canvas));
        canvas?.renderAll();
      }
    } else if (state.backgrounds.length && state.activeStateIndex === null) {
      setLocalImage('');
      canvas?.trigger('background:modified', null);
    }

    if (
      (action === (UNDO) && nextEvent?.type === 'backgroundColorChanged') ||
      (action === REDO && currentEvent?.type === 'backgroundColorChanged') ||
      (action === UNDO &&
        currentEvent?.type === 'backgroundColorChanged' &&
        nextEvent?.type === 'clearedWhiteboard')
    ) {
      const fill = getPreviousBackground(state.eventIndex, state.events);
      const divColorBackground = getPreviousBackgroundDivColor(
        state.eventIndex,
        state.events
      );

      if (divColorBackground) {
        setBackgroundColorInCanvas(divColorBackground);
      } else {
        canvas.backgroundColor = fill;
      }
    }

    if (action === REDO && currentEvent.type === 'clearedWhiteboard') {
      canvas.backgroundColor = 'transparent';
    }

    canvas.renderAll();
  });
};

/**
 * Render Undo/Redo action in Local Whiteboard according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {'UNDO' | 'REDO'} action - Action made
 * @param {boolean} shapesAreSelectable - Flag to know if objects are able
 * to be selectable
 * @param {(color: string) => void} setBackgroundColorInCanvas - Function to
 * set background color in current canvas
 */
export const RenderLocalUndoRedo = (
  canvas: fabric.Canvas,
  instanceId: string,
  state: CanvasHistoryState,
  action: 'UNDO' | 'REDO' | 'CANVAS_UNDO' | 'CANVAS_REDO',
  shapesAreSelectable: boolean,
  setBackgroundColorInCanvas: (color: string) => void,
  setLocalImage: (img: string | File) => void,
  setBackgroundImageIsPartialErasable: (state: boolean) => void
) => {
  /**
   * Reset selectable, evented and strokeUniform properties
   * when a group of objects had an undo/redo action
   */
  const resetObjectsSelectability = () => {
    canvas?.forEachObject((object: ICanvasObject) => {
      const id = object.id as string;
      const isLocal = isLocalObject(id, instanceId);

      object.set({
        selectable: isLocal && shapesAreSelectable,
        evented: isLocal && shapesAreSelectable,
        strokeUniform: true,
      });
    });

    canvas.renderAll();
  };

  // To prevent fabricjs observers from updating state on rerender.
  canvas.forEachObject((object: TypedShape) => {
    if (isLocalObject(object.id as string, instanceId)) {
      object.set({ fromJSON: true });
    }
  });

  // Getting the object of the current state
  const mapped: { [key: string]: any } = mapActiveState(
    state.activeState as string
  );

  // Loading objects in canvas
  loadFromJSON(
    canvas,
    mapped,
    instanceId,
    state,
    action,
    setBackgroundColorInCanvas,
    setLocalImage,
    setBackgroundImageIsPartialErasable
  );

  // If undo/redo was applied in a group of objects
  if (mapped.length === 1 && mapped[0].type === 'activeSelection') {
    resetObjectsSelectability();
  }
};
