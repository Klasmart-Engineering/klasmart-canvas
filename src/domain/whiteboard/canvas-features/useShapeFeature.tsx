import { Group } from 'fabric/fabric-impl';
import { useCallback, useContext, useEffect } from 'react';
import { ICanvasBrush } from '../../../interfaces/brushes/canvas-brush';
import { ICanvasShapeBrush } from '../../../interfaces/brushes/canvas-shape-brush';
import { ICoordinate } from '../../../interfaces/brushes/coordinate';
import { IPenPoint } from '../../../interfaces/brushes/pen-point';
import { IUndoRedoEvent } from '../../../interfaces/canvas-events/undo-redo-event';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import { IPermissions } from '../../../interfaces/permissions/permissions';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { ChalkBrush } from '../brushes/classes/chalkBrush';
import { PaintBrush } from '../brushes/classes/paintBrush';
import { PenBrush } from '../brushes/classes/penBrush';
import ICanvasActions from '../canvas-actions/ICanvasActions';
import {
  ObjectEvent,
  ObjectType,
} from '../event-serializer/PaintEventSerializer';
import { CanvasAction, SET } from '../reducers/undo-redo';
import { getToolbarIsEnabled } from '../redux/utils';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { isEmptyShape } from '../utils/shapes';
import { WhiteboardContext } from '../WhiteboardContext';

/**
 * Handles the logic for shape creation
 * @param {fabric.Canvas} canvas - Canvas to add the shape
 * @param {string} userId - User that will create the shape
 * @param {ICanvasActions} actions - Shared functions necessaries
 * to work shape creation logic
 * @param {(specific: string, color?: string) => void} mouseDown - Mouse Event
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save shapes states and could make und/redo over them
 */
export const useShapeFeature = (
  canvas: fabric.Canvas,
  userId: string,
  actions: ICanvasActions,
  mouseDown: (specific: string, color?: string) => void,
  undoRedoDispatch: (action: CanvasAction) => void,
  serializerToolbarState: IPermissions
) => {
  // Getting context variables
  const {
    shapeIsActive,
    brushIsActive,
    allToolbarIsEnabled,
    isLocalObject,
    textIsActive,
    floodFillIsActive,
    shapesAreEvented,
    eraseType,
    laserIsActive,
    shape,
    perfectShapeIsActive,
    perfectShapeIsAvailable,
    updatePerfectShapeIsActive,
    pointerEvents,
  } = useContext(WhiteboardContext);

  // Getting event serializer to synchronize objects
  const {
    state: { eventSerializer },
  } = useSharedEventSerializer();

  /**
   * Multiplies the width by scaleX of the given shape
   * to obtain the real current width
   * @param {TypedShape} shape - Shape to calculate its real width
   */
  const getShapeRealWidth = (shape: TypedShape) => {
    return Number(shape.width) * Number(shape.scaleX);
  };

  /**
   * Multiplies the height by scaleY of the given shape
   * to obtain the real current height
   * @param {TypedShape} shape - Shape to calculate its real height
   */
  const getShapeRealHeight = (shape: TypedShape) => {
    return Number(shape.height) * Number(shape.scaleY);
  };

  /**
   * Checks if the given object is a local shape
   * @param {TypedShape} shape - Object to check
   */
  const isLocalShape = useCallback(
    (shape: TypedShape) => {
      return shape.id && isEmptyShape(shape) && isLocalObject(shape.id, userId);
    },
    [isLocalObject, userId]
  );

  /**
   * Checks if is possible resize the active object perfectly
   */
  const activeShapeCanBePerfectSized = useCallback(() => {
    return (
      perfectShapeIsActive &&
      canvas.getActiveObject() 
    );
  }, [canvas, perfectShapeIsActive]);

  /**
   * Get the permissions for students and teacher to use shape feature.
   */
  const getPermissions = useCallback(() => {
    const toolbarIsEnabled = getToolbarIsEnabled();
    return {
      teacherHasPermission: allToolbarIsEnabled && shape && shapeIsActive,
      studentHasPermission:
        shape &&
        shapeIsActive &&
        toolbarIsEnabled &&
        serializerToolbarState.shape,
    };
  }, [allToolbarIsEnabled, shape, shapeIsActive, serializerToolbarState]);

  /**
   * Synchronizes and dispatches undo/redo for pperfect shape scaling
   */
  const syncAndDispatchPerfectShapeScaling = useCallback(
    (shape: TypedShape) => {
      const id = String(shape.id);
      const type = shape.get('type') as ObjectType;
      const target = {
        top: shape.top,
        left: shape.left,
        angle: shape.angle,
        scaleX: shape.scaleX,
        scaleY: shape.scaleY,
        flipX: shape.flipX,
        flipY: shape.flipY,
        originX: shape.originX,
        originY: shape.originY,
      } as ICanvasObject;

      const payload: ObjectEvent = {
        id,
        type,
        target: { eTarget: target, isGroup: false },
      };

      eventSerializer.push('scaled', payload);

      if (canvas) {
        const event = { event: payload, type: 'scaled' };

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }
    },
    [canvas, eventSerializer, undoRedoDispatch, userId]
  );

  /**
   * Disables canvas mouse events when shape is inactive.
   */
  useEffect(() => {
    if (!shapeIsActive && canvas) {
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  }, [shapeIsActive, canvas]);

  /**
   * Sets local objects like no evented and no selectable
   * to could draw shapes over whiteboard
   */
  useEffect(() => {
    const { teacherHasPermission, studentHasPermission } = getPermissions();

    if (teacherHasPermission || studentHasPermission) {
      canvas?.forEachObject((object: ICanvasObject) => {
        if (object.id && isLocalObject(object.id, userId)) {
          object.set({
            evented: false,
            selectable: false,
          });
        }
      });

      actions.addShape(shape);
    }

    return () => {
      if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
        canvas?.off('mouse:down');
      }

      if (eraseType !== 'object') {
        canvas?.off('mouse:up');
      }

      if (!laserIsActive && !brushIsActive && pointerEvents) {
        canvas?.off('mouse:move');
      }
    };
  }, [
    canvas,
    shape,
    shapeIsActive,
    actions,
    textIsActive,
    userId,
    floodFillIsActive,
    eraseType,
    shapesAreEvented,
    isLocalObject,
    laserIsActive,
    allToolbarIsEnabled,
    serializerToolbarState.shape,
    getPermissions,
    brushIsActive,
    pointerEvents,
  ]);

  /**
   * Set a selected shape like perfect if perfectShapeIsActive
   */
  useEffect(() => {
    if (!canvas) return;

    /**
     * When the lines to fix are paintbrush type is necessary
     * create a new paintbrush path based on its current data
     * @param {ICanvasBrush} path - Path to take base to create the new one
     */
    const fixPaintBrushLines = (path: ICanvasShapeBrush) => {
      if (!canvas || !userId) return;

      const brush = new PaintBrush(canvas, userId);
      const newPoints = (path.basePath?.points as ICoordinate[]).map(
        (point) => {
          return {
            x: point.x * Number(path.scaleX),
            y: point.y * Number(path.scaleY),
          };
        }
      );

      const newPath = brush.modifyPaintBrushPath(
        String(path.id),
        newPoints,
        Number(path.basePath?.strokeWidth),
        String(path.basePath?.stroke),
        path.basePath?.bristles || []
      );

      path.set({ ...newPath });
      ((path as unknown) as Group).addWithUpdate();
      canvas.renderAll();
    };

    /**
     * Fix the lines of marker/paintbrush path to maintain
     * the same separation on them when marker/paintbrush path is scaled
     * @param {ICanvasBrush} path - Modified path
     */
    const fixLines = (path: ICanvasShapeBrush) => {
      let top = path.top;
      let left = path.left;

      if (path.basePath?.type === 'paintbrush') {
        fixPaintBrushLines(path);
      }

      ((path as unknown) as Group)._objects.forEach((line) => {
        line.set({
          top: Number(line.top) / Number(path.scaleY),
          left: Number(line.left) / Number(path.scaleX),
        });
      });
      ((path as unknown) as Group).addWithUpdate();

      (path as ICanvasShapeBrush).set({
        top: top,
        left: left,
        blockResize: true,
        lockUniScaling: perfectShapeIsActive,
      });

      ((path as unknown) as Group).addWithUpdate();
    };

    /**
     * Fix the given custom shape to make it perfect
     * @param shapeToFix - Shape to make it perfect
     */
    const fixCustomBrushShape = async (shapeToFix: ICanvasShapeBrush) => {
      const type: ObjectType = (shapeToFix as ICanvasObject).get(
        'type'
      ) as ObjectType;

      const brushTarget = shapeToFix;
      const brushType = brushTarget.basePath?.type;
      const id = brushTarget.id;

      let target = {
        top: shapeToFix.top,
        left: shapeToFix.left,
        angle: shapeToFix.angle,
        scaleX: shapeToFix.scaleX,
        scaleY: shapeToFix.scaleY,
        flipX: shapeToFix.flipX,
        flipY: shapeToFix.flipY,
        originX: shapeToFix.originX,
        originY: shapeToFix.originY,
        name: shapeToFix.name,
      } as ICanvasShapeBrush;

      switch (brushType) {
        case 'pen': {
          if (!canvas || !userId) return;

          const brush = new PenBrush(canvas, userId);
          const basePath = brushTarget.basePath;
          const newPoints = (basePath?.points as IPenPoint[]).map((point) => {
            return {
              x: point.x * Number(shapeToFix?.scaleX),
              y: point.y * Number(shapeToFix?.scaleY),
              width: point.width,
            };
          });

          try {
            const newObject = brush.createPenPath(
              String(brushTarget.id),
              newPoints,
              Number(basePath?.strokeWidth),
              String(basePath?.stroke)
            );

            if (!shapeToFix) return;

            const id = brushTarget.id;
            ((newObject as unknown) as ICanvasShapeBrush).set({
              top: shapeToFix.top,
              left: shapeToFix.left,
              angle: shapeToFix.angle,
              flipX: shapeToFix.flipX,
              flipY: shapeToFix.flipY,
              name: shapeToFix.name,
              shapeType: (shapeToFix as ICanvasShapeBrush).shapeType,
              blockResize: true,
              lockUniScaling: perfectShapeIsActive,
            });

            // Id's are deleted to avoid add and remove event serializing
            delete shapeToFix.id;
            delete newObject.id;

            canvas.remove(shapeToFix);
            canvas.add(newObject);
            canvas.setActiveObject(newObject);
            canvas.renderAll();

            // Id's are deleted to avoid add and remove event serializing
            newObject.set({
              id: id,
            });
          } catch (e) {
            console.warn(e);
          }

          target.type = 'group-pen';
          break;
        }

        case 'marker':
        case 'felt':
        case 'paintbrush': {
          fixLines(brushTarget);
          canvas?.renderAll();
          target.type = 'group-marker';
          break;
        }
        case 'chalk':
        case 'crayon': {
          if (!canvas || !userId) return;

          const brush = new ChalkBrush(canvas, userId, brushType);
          const basePath = brushTarget.basePath;
          const newPoints = (basePath?.points as ICoordinate[]).map((point) => {
            return {
              x: point.x * Number(shapeToFix?.scaleX),
              y: point.y * Number(shapeToFix?.scaleY),
            };
          });

          const newRects = brush.createChalkEffect(
            newPoints,
            Number(basePath?.strokeWidth)
          );

          try {
            const newObject = await brush.createChalkPath(
              String(brushTarget.id),
              newPoints,
              Number(basePath?.strokeWidth),
              String(basePath?.stroke),
              newRects
            );

            if (!shapeToFix) return;

            const id = brushTarget.id;
            ((newObject as unknown) as ICanvasShapeBrush).set({
              top: shapeToFix.top,
              left: shapeToFix.left,
              angle: shapeToFix.angle,
              flipX: shapeToFix.flipX,
              flipY: shapeToFix.flipY,
              name: shapeToFix.name,
              shapeType: (shapeToFix as ICanvasShapeBrush).shapeType,
              lockUniScaling: perfectShapeIsActive,
              blockResize: true,
            });

            // Id's are deleted to avoid add and remove event serializing
            delete shapeToFix.id;
            delete newObject.id;

            canvas.remove(shapeToFix);
            canvas.add(newObject);
            canvas.setActiveObject(newObject);
            canvas.renderAll();

            // Id's are deleted to avoid add and remove event serializing
            newObject.set({
              id: id,
            });

            target.type = 'image-based';
          } catch (e) {
            console.warn(e);
          }

          break;
        }
      }

      const payload: ObjectEvent = {
        id: id as string,
        type: type as ObjectType,
        target: { eTarget: target, isGroup: false },
      };

      eventSerializer?.push('scaled', payload);

      if (canvas) {
        const event = { event: payload, type: 'scaled' };

        undoRedoDispatch({
          type: SET,
          payload: canvas.getObjects(),
          canvasId: userId,
          event: (event as unknown) as IUndoRedoEvent,
        });
      }
    };

    /*
      Hide/Show resize middle controls in local shapes.
      When perfectShapeIsActive controls will be hidden
      and when not will be shown
    */
    canvas.forEachObject((object: ICanvasObject) => {
      if (isLocalShape(object as TypedShape)) {
        object.set({
          lockUniScaling: perfectShapeIsActive,
        });
      }
    });

    canvas.renderAll();

    // Resets active shape like perfect
    if(canvas.getActiveObject()){
      const shapeToFix = canvas.getActiveObject();
      if(perfectShapeIsActive){
          let scaling;
          shapeToFix.lockUniScaling = true
          const width = getShapeRealWidth(shapeToFix);
          const heigth = getShapeRealHeight(shapeToFix);
          
          if ((shapeToFix as ICanvasShapeBrush).blockResize) return;
    
          if (width > heigth) {
            scaling = { scaleY: width / Number(shapeToFix.height) };
          } else if (heigth > width) {
            scaling = { scaleX: heigth / Number(shapeToFix.width) };
          }
    
          if (scaling) {
            shapeToFix.set(scaling);
    
            if (
              (shapeToFix as ICanvasBrush).basePath?.type === 'pencil' ||
              (shapeToFix as ICanvasBrush).basePath?.type === 'dashed'
            ) {
              syncAndDispatchPerfectShapeScaling(shapeToFix);
            } else {
              fixCustomBrushShape(shapeToFix as ICanvasShapeBrush);
            }
          }
    
          shapeToFix.setCoords();
          canvas.renderAll();
      }else{
        shapeToFix.lockUniScaling = false
        canvas.renderAll();
      }
    }

    /* If isLocalObject is added on dependencies
    an unexpected event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, perfectShapeIsActive, userId]);

  /**
   * Reset perfectShapeIsActive to false when the shape
   * or move tool permissions are revoked
   */
  useEffect(() => {
    if (!perfectShapeIsAvailable()) {
      updatePerfectShapeIsActive(false);
    }
  }, [perfectShapeIsAvailable, updatePerfectShapeIsActive]);
};
