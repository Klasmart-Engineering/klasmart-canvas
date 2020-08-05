import fabric from 'fabric/fabric-impl';
import { EventPainterController } from './event-serializer/EventPainterController';

/** Class responsible for receiving events from the EventPainterController
 * and rendering or changing shapes in the canvas based on those events. */
export class EventDrivenCanvasRenderer {
  private canvas: fabric.Canvas;

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
  }

  attachEvents(eventController: EventPainterController): void {
    eventController.on(
      'added',
      (id: string, objectType: string, target: any) => {
        if (!id) {
          return;
        }

        // No queremos agregar nuestros propios eventos
        // if (isLocalObject(id, canvasId)) return;

        if (objectType === 'textbox') {
          let text = new fabric.Textbox(target.text, {
            fontSize: 30,
            fontWeight: 400,
            fontStyle: 'normal',
            fontFamily: target.fontFamily,
            fill: target.stroke,
            top: target.top,
            left: target.left,
            width: target.width,
            selectable: false,
          });

          // @ts-ignore
          text.id = id;

          this.canvas.add(text);
          return;
        }

        if (objectType === 'path') {
          const pencil = new fabric.PencilBrush();
          pencil.color = target.stroke || '#000';
          pencil.width = target.strokeWidth;

          // Convert Points to SVG Path
          const res = pencil.createPath(target.path);
          // @ts-ignore
          res.id = id;
          res.selectable = false;
          res.evented = false;

          this.canvas.add(res);
        }
      }
    );
  }
}
