import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import goodStamp from '../../../assets/icons/toolbar/good-stamp.png';
import wellDoneStamp from '../../../assets/icons/toolbar/well-done-stamp.png';
import excellentStamp from '../../../assets/icons/toolbar/excellent-stamp.png';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';

const useSynchronizedSendStamp = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventController },
  } = useSharedEventSerializer();

  const getStampURLImage = (stamp: string) => {
    switch (stamp) {
      case 'good':
        return goodStamp;

      case 'wellDone':
        return wellDoneStamp;

      case 'excellent':
        return excellentStamp;
    }
  };

  useEffect(() => {
    const showStamp = (id: string, target: any) => {
      let stampWidth = 50;
      let stampHeight = 50;
      const { stamp, assignTo, stampMode } = target;

      if (!shouldHandleRemoteEvent(id)) return;

      if (userId !== assignTo && stampMode === 'student') return;

      console.log(target);

      const imageURL = getStampURLImage(stamp);

      if (!imageURL) return;

      fabric.Image.fromURL(imageURL, (image) => {
        try {
          if (!canvas) return;

          ((image as fabric.Object) as ICanvasObject).set({
            top: Number(canvas?.height) / 2 - stampHeight / 2,
            left: Number(canvas?.width) / 2 - stampWidth / 2,
            scaleX: stampWidth / Number(image.width),
            scaleY: stampHeight / Number(image.height),
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            justForWatch: true,
          });

          canvas?.add(image);
          canvas?.renderAll();

          const moveToCorner = () => {
            console.log(image.top, image.left);
            image.animate(
              {
                top: 30,
                left: Number(canvas.width) - 30,
              },
              {
                duration: 500,
                easing: fabric.util.ease.easeInQuad,
                onChange: canvas.renderAll.bind(canvas),
              }
            );
          };

          const reduce = () => {
            window.setTimeout(() => {
              image.animate(
                {
                  scaleX: Number(image.scaleX) - 2,
                  scaleY: Number(image.scaleY) - 2,
                },
                {
                  duration: 500,
                  easing: fabric.util.ease.easeInQuad,
                  onChange: canvas.renderAll.bind(canvas),
                  onComplete: moveToCorner,
                }
              );
            }, 3000);
          };

          image.animate(
            {
              scaleX: Number(image.scaleX) + 2,
              scaleY: Number(image.scaleY) + 2,
            },
            {
              duration: 1000,
              easing: fabric.util.ease.easeInQuad,
              onChange: canvas.renderAll.bind(canvas),
              onComplete: reduce,
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    };

    eventController?.on('sendStamp', showStamp);

    return () => {
      eventController?.removeListener('sendStamp', showStamp);
    };
  }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
};

export default useSynchronizedSendStamp;
