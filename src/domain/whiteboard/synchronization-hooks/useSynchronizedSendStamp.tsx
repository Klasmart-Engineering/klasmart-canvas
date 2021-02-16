import { useCallback, useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import goodStamp from '../../../assets/icons/toolbar/good-stamp.png';
import wellDoneStamp from '../../../assets/icons/toolbar/well-done-stamp.png';
import excellentStamp from '../../../assets/icons/toolbar/excellent-stamp.png';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import store from '../redux/store';

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

  const determineStampPosition = useCallback(
    (stampWidth: number, stampHeight: number) => {
      let top;
      let left;
      const stampsInRow = Math.floor(Number(canvas?.width) / (stampWidth + 10));
      const stampsInColumn = Math.floor(Number(canvas?.height) / stampHeight);

      let existentStamps = canvas
        ?.getObjects()
        .filter((obj: ICanvasObject) => obj.stampObject).length as number;

      if (existentStamps <= stampsInRow * stampsInColumn) {
        top = Math.floor(existentStamps / stampsInRow) * stampHeight + 10;
        left =
          Number(canvas?.width) -
          (existentStamps % stampsInRow) * (stampWidth + 10) -
          (stampWidth + 10);
      } else {
        top = Number(canvas?.height) - stampHeight;
        left = Number(canvas?.width) - (stampWidth + 10);
      }

      return {
        top,
        left,
      };
    },
    [canvas]
  );

  useEffect(() => {
    const showStamp = (id: string, target: any) => {
      let stampWidth = 50;
      let stampHeight = 50;
      const { stamp, assignTo, stampMode } = target;

      if (!shouldHandleRemoteEvent(id)) return;

      if (userId !== assignTo && stampMode === 'student') return;

      const imageURL = getStampURLImage(stamp);

      if (!imageURL) return;

      fabric.Image.fromURL(imageURL, (image) => {
        try {
          if (!canvas) return;

          let presentText: fabric.IText | null = null;

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
          });

          canvas?.add(image);

          if (stampMode === 'present' && userId !== assignTo) {
            const assignedUser = store.getState().usersState.find((student) => {
              return student.id === assignTo;
            });

            const presentMessage = `Stamp for ${assignedUser?.name}`;
            presentText = new fabric.IText(presentMessage, {
              fontFamily: 'Crayon',
              top: Number(canvas?.height) / 2 - stampHeight / 2,
              left: Number(canvas?.width) / 2 - stampWidth / 2,
              fill: '#444444',
              textAlign: 'center',
              scaleX: stampWidth / Number(image.width),
              scaleY: stampHeight / Number(image.height),
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
              lockMovementX: true,
              lockMovementY: true,
            });

            canvas.add(presentText);
          }

          canvas?.renderAll();

          const afterShowingAction = () => {
            if (assignTo === userId) {
              moveToCorner();
            } else {
              removeStamp();
            }
          };

          const moveToCorner = () => {
            const { top, left } = determineStampPosition(
              stampWidth,
              stampHeight
            );

            (image as ICanvasObject).set({
              originX: 'left',
              originY: 'top',
              stampObject: true,
            });

            image.animate(
              {
                top,
                left,
              },
              {
                duration: 500,
                easing: fabric.util.ease.easeInQuad,
                onChange: canvas.renderAll.bind(canvas),
              }
            );

            if (presentText) {
              canvas.remove(presentText);
            }
          };

          const removeStamp = () => {
            image.animate(
              {
                scaleX: 0,
                scaleY: 0,
              },
              {
                duration: 500,
                easing: fabric.util.ease.easeOutQuad,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                  canvas.remove(image);
                  canvas.renderAll();
                },
              }
            );

            presentText?.animate(
              {
                scaleX: 0,
                scaleY: 0,
              },
              {
                duration: 500,
                easing: fabric.util.ease.easeOutQuad,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                  if (!presentText) return;

                  canvas.remove(presentText);
                  canvas.renderAll();
                },
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
                  onComplete: afterShowingAction,
                }
              );

              presentText?.animate(
                {
                  scaleX: 0.5,
                  scaleY: 0.5,
                },
                {
                  duration: 500,
                  easing: fabric.util.ease.easeInQuad,
                  onChange: canvas.renderAll.bind(canvas),
                  onComplete: afterShowingAction,
                }
              );
            }, 100);
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

          presentText?.animate(
            {
              scaleX: 2,
              scaleY: 2,
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
  }, [
    canvas,
    determineStampPosition,
    eventController,
    shouldHandleRemoteEvent,
    userId,
  ]);
};

export default useSynchronizedSendStamp;
