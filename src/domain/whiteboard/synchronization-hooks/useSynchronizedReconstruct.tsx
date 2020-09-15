import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import { CanvasAction, SET_OTHER } from '../reducers/undo-redo';
import { fabric } from 'fabric';
import { TypedGroup } from '../../../interfaces/shapes/group';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

const useSynchronizedReconstruct = (
  canvas: fabric.Canvas | undefined,
  shouldHandleRemoteEvent: (id: string) => boolean,
  userId: string,
  undoRedoDispatch: React.Dispatch<CanvasAction>
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const getId = (id: string | undefined) => (id ? id.split(':')[0] : null);

  useEffect(() => {
    const reconstruct = (id: string, target: ICanvasObject) => {
      if (!shouldHandleRemoteEvent(id)) return;

      const parsed = JSON.parse(target.param as string);
      if (parsed === false) {
        canvas?.getObjects().forEach((object: TypedShape) => {
          if (getId(id) === getId(object.id)) {
            canvas.remove(object);
          }
        });
      }

      if (parsed.background && canvas) {
        canvas?.setBackgroundColor(parsed.background, () => {});
        canvas.renderAll();
        return;
      }

      const objects = JSON.parse(target.param as string).objects;

      const reset = (object: TypedShape): void => {
        const old = canvas
          ?.getObjects()
          .filter((o: TypedShape) => o.id === object.id)[0];
        object.set({ selectable: false, evented: false });
        canvas?.remove(old as fabric.Object);
        canvas?.add(object);
      };

      objects?.forEach((object: TypedShape) => {
        if (object && object.type === 'path') {
          const group: TypedGroup | undefined = canvas
            ?.getObjects()
            .filter((o: any) => o._objects)[0] as TypedGroup;
          if (group && group.id) {
            canvas?.remove(group);
          }

          fabric.Path.fromObject(object, (path: TypedShape) => {
            reset(path);
          });

          canvas?.renderAll();
        } else if (object && object.type === 'polygon') {
          // Ignore is required, typing is wrong in definition file.
          //@ts-ignore
          fabric.Polygon.fromObject(object, (o: TypedShape) => {
            reset(o);
          });
        } else if (object && object.type === 'textbox') {
          fabric.Textbox.fromObject(object, (text: TypedShape) => {
            reset(text);
          });
        } else if (object && object.type === 'rect') {
          // Ignore is required, typing is wrong in definition file.
          //@ts-ignore
          fabric.Rect.fromObject(object, (o: TypedShape) => {
            reset(o);
          });
        } else if (object && object.type === 'ellipse') {
          // Ignore is required, typing is wrong in definition file.
          //@ts-ignore
          fabric.Ellipse.fromObject(object, (o: TypedShape) => {
            reset(o);
          });
        } else if (object && object.type === 'triangle') {
          // Ignore is required, typing is wrong in definition file.
          //@ts-ignore
          fabric.Triangle.fromObject(object, (o: TypedShape) => {
            reset(o);
          });
        } else if (object) {
          let items: TypedShape[] = [];
          fabric.Group.fromObject(object, (group: fabric.Group) => {
            debugger;
            const old = canvas
              ?.getObjects()
              .filter((o: TypedShape) => o.id === object.id)[0];
            if (group.getObjects()) {
              group.getObjects().forEach((o: TypedShape) => {
                const oldO = canvas
                  ?.getObjects()
                  .filter((oldObject: TypedShape) => oldObject.id === o.id)[0];
                canvas?.remove(oldO as fabric.Object);
                items.push(o);
              });
            }
            group.set({ selectable: false, evented: false });
            canvas?.remove(old as fabric.Object);
            canvas?.add(group);
            group.destroy();

            items.forEach((o: TypedShape) => {
              canvas?.add(o);
            });
          });
        }

        undoRedoDispatch({
          type: SET_OTHER,
          payload: (canvas?.getObjects() as unknown) as TypedShape[],
          canvasId: userId,
        });
      });
    };

    eventController?.on('reconstruct', reconstruct);

    return () => {
      eventController?.removeListener('reconstruct', reconstruct);
    };
  }, [
    canvas,
    eventController,
    shouldHandleRemoteEvent,
    undoRedoDispatch,
    userId,
  ]);
};

export default useSynchronizedReconstruct;
