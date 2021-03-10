import { useCallback, useContext, useEffect, useState } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import goodStamp from '../../../assets/icons/toolbar/good-stamp.png';
import wellDoneStamp from '../../../assets/icons/toolbar/well-done-stamp.png';
import excellentStamp from '../../../assets/icons/toolbar/excellent-stamp.png';
import { fabric } from 'fabric';
import { ICanvasObject } from '../../../interfaces/objects/canvas-object';
import store from '../redux/store';
import { WhiteboardContext } from '../WhiteboardContext';
import { IStampSyncTarget } from '../../../interfaces/stamps/stamp-sync-target';
import { IUtilAminEaseFunction } from 'fabric/fabric-impl';
import { v4 as uuidv4 } from 'uuid';
import { ADD_STAMP } from '../redux/actions';
import { IPortfolio } from '../../../interfaces/portfolio/portfolio';

const useSynchronizedSendStamp = (
  canvas: fabric.Canvas | undefined,
  userId: string,
  shouldHandleRemoteEvent: (id: string) => boolean
) => {
  const {
    state: { eventSerializer, eventController },
  } = useSharedEventSerializer();

  const {
    stampAssignedStudents,
    stamp,
    stampMode,
    updateStampAssignedStudents,
  } = useContext(WhiteboardContext);

  /**
   * Durations for each stage of the animation
   */
  const animationDurations = {
    growing: 1000,
    staying: 3000,
    reducing: 500,
    afterShowing: 500,
    stampGap: 500,
  };

  /**
   * Duration of the complete animation
   */
  const totalDuration =
    animationDurations.growing +
    animationDurations.staying +
    animationDurations.reducing +
    animationDurations.afterShowing +
    animationDurations.stampGap;

  const stampWidth = 50;
  const stampHeight = 50;

  // State for register the time in that the animation started
  const [startTime, setStartTime] = useState<Date | null>(null);

  /**
   * Checks the received stamp and find its image src
   * @param stamp - Stamp to find
   */
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

  /**
   * Checks the current stamp objects to set the position of the next stamp
   */
  const determineStampPosition = useCallback(
    (stampWidth: number, stampHeight: number, stampQuantity: number) => {
      let top;
      let left;
      const canvasWidth = Number(canvas?.width);
      const canvasHeight = Number(canvas?.height);
      const stampsInRow = Math.floor(Number(canvas?.width) / (stampWidth + 10));
      const stampsInColumn = Math.floor(Number(canvas?.height) / stampHeight);

      if (stampQuantity <= stampsInRow * stampsInColumn) {
        top = Math.floor(stampQuantity / stampsInRow) * stampHeight + 10;
        left =
          canvasWidth -
          (stampQuantity % stampsInRow) * (stampWidth + 10) -
          (stampWidth + 10);
      } else {
        top = canvasHeight - stampHeight;
        left = canvasHeight - (stampWidth + 10);
      }

      return {
        top,
        left,
      };
    },
    [canvas]
  );

  /**
   * Animates the received object
   * @param object - Object to animate
   * @param valuesToChange - Properties and values to change in the object
   * @param duration - Animation duration in milliseconds
   * @param easeEffect - Effect to run the animation
   * @param onComplete - Callback to execute once the animation is finished
   */
  const animateObject = useCallback(
    (
      object: fabric.Object,
      valuesToChange: { [key: string]: string | number },
      duration: number,
      easeEffect: IUtilAminEaseFunction,
      onComplete?: () => void
    ) => {
      object.animate(valuesToChange, {
        duration: duration,
        easing: easeEffect,
        onChange: canvas?.renderAll.bind(canvas),
        onComplete: onComplete,
      });
    },
    [canvas]
  );

  /**
   * Checks if an stamp with the given id already exists in the whiteboard
   * @param id - Id to find the stamp
   */
  const stampAlreadyExists = useCallback(
    (id: string) => {
      return !!canvas?.getObjects().find((obj: ICanvasObject) => {
        return obj.id === id;
      });
    },
    [canvas]
  );

  /**
   * Gets the current stamps quantity for the given student
   * @param studentId - Id of the student to find the stamps
   */
  const getStampsCountByStudentId = useCallback((studentId: string) => {
    const stampCount = (store.getState().potfolioReducer as IPortfolio[])
      .find((portfolio) => portfolio.studentId === studentId)
      ?.studentStamps.map((stamp) => stamp.quantity)
      .reduce((accumulator, value) => accumulator + value, 0);

    return Number(stampCount);
  }, []);

  /**
   * Adds a stamp when it comes from persistent events,
   * basically omits the animation and directly this added
   * on the whiteboard's corner.
   * @param stampId - Id to assign to the stamp.
   * @param assignTo - Id of the student to assign the stamp.
   * @param currentStampCount - Current stamps quantity for the given student.
   * @param image - Image Object for the stamp.
   */
  const addPersistentEventStamp = useCallback(
    (
      stampId: string,
      assignTo: string,
      currentStampCount: number,
      image: fabric.Image
    ) => {
      if (stampAlreadyExists(stampId) || !canvas) return;
      const { top, left } = determineStampPosition(
        stampWidth,
        stampHeight,
        currentStampCount
      );

      (image as ICanvasObject).set({
        id: stampId,
        top,
        left,
        originX: 'left',
        originY: 'top',
        scaleX: stampWidth / Number(image.width),
        scaleY: stampHeight / Number(image.height),
      });

      canvas.add(image);
      canvas.renderAll();

      store.dispatch({
        type: ADD_STAMP,
        payload: { studentId: assignTo, stamp },
      });
    },
    [canvas, determineStampPosition, stamp, stampAlreadyExists]
  );

  // Handling remote. Receives the event.
  useEffect(() => {
    /**
     * Handler for sendStamp event
     * @param id - user id of the user that sent the stamp
     * @param target - Object with data for render the stamp
     * @param isPersistent - Flag to know if this event
     * comes from persistent events or not
     */
    const showStamp = (
      id: string,
      target: IStampSyncTarget,
      isPersistent: boolean
    ) => {
      const { stampId, stamp, assignTo, stampMode } = target;

      // If teacher receives event ignore it
      if (!shouldHandleRemoteEvent(id)) return;

      /**
       * If current user is not the assigned
       * and stamp mode is student, ignore it
       */
      if (userId !== assignTo && stampMode === 'student') return;

      // Getting image URL of the received stamp
      const imageURL = getStampURLImage(stamp);

      if (!imageURL) return;

      fabric.Image.fromURL(imageURL, (image) => {
        try {
          if (!canvas) return;

          const currentStampCount = getStampsCountByStudentId(assignTo);

          if (isPersistent) {
            addPersistentEventStamp(
              stampId,
              assignTo,
              currentStampCount,
              image
            );

            return;
          }

          let presentText: fabric.IText | null = null;
          const canvasWidth = Number(canvas?.width);
          const canvasHeight = Number(canvas?.height);

          // Setting properties for the created stamp
          ((image as fabric.Object) as ICanvasObject).set({
            top: canvasHeight / 2 - stampHeight / 2,
            left: canvasWidth / 2 - stampWidth / 2,
            scaleX: stampWidth / canvasWidth,
            scaleY: stampHeight / canvasHeight,
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            stampObject: true,
          });

          canvas?.add(image);

          if (stampMode === 'present' && userId !== assignTo) {
            // Getting the name of the assigned user
            const assignedUser = store.getState().usersState.find((student) => {
              return student.id === assignTo;
            });

            // Message for present in presentText
            const presentMessage = `Stamp for ${assignedUser?.name}`;

            // Setting the properties for render the presentText
            presentText = new fabric.IText(presentMessage, {
              fontFamily: 'Crayon',
              top: canvasHeight / 2 - stampHeight / 2,
              left: canvasWidth / 2 - stampWidth / 2,
              fill: '#444444',
              textAlign: 'center',
              scaleX: stampWidth / canvasWidth,
              scaleY: stampHeight / canvasHeight,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
              lockMovementX: true,
              lockMovementY: true,
            });

            (presentText as ICanvasObject).set({
              stampObject: true,
            });

            canvas.add(presentText);
          }

          canvas?.renderAll();

          /**
           * Decides which after showing animation will do
           * according with the current stamp state
           */
          const afterShowingAction = () => {
            if (assignTo === userId) {
              moveToCorner();
            } else {
              removeStamp();
            }
          };

          /**
           * After showing animation for the stamp
           * when this stamp is for the current user
           */
          const moveToCorner = () => {
            const { top, left } = determineStampPosition(
              stampWidth,
              stampHeight,
              currentStampCount
            );

            const valuesToChange = { top, left };
            const duration = animationDurations.afterShowing;
            const easeEffect = fabric.util.ease.easeInQuad;

            (image as ICanvasObject).set({
              id: stampId,
              originX: 'left',
              originY: 'top',
            });

            animateObject(image, valuesToChange, duration, easeEffect);

            if (presentText) {
              canvas.remove(presentText);
            }

            store.dispatch({
              type: ADD_STAMP,
              payload: { studentId: assignTo, stamp },
            });
          };

          /**
           * After showing animation for stamp and presentText
           * when this stamp is not for the current user
           */
          const removeStamp = () => {
            const valuesToChange = { scaleX: 0, scaleY: 0 };
            const duration = animationDurations.afterShowing;
            const easeEffectStamp = fabric.util.ease.easeInQuad;
            const easeEffectText = fabric.util.ease.easeInQuad;

            const onCompleteStamp = () => {
              canvas.remove(image);
              canvas.renderAll();
            };

            const onCompleteText = () => {
              if (!presentText) return;

              canvas.remove(presentText);
              canvas.renderAll();
            };

            animateObject(
              image,
              valuesToChange,
              duration,
              easeEffectStamp,
              onCompleteStamp
            );

            if (!presentText) return;

            animateObject(
              presentText,
              valuesToChange,
              duration,
              easeEffectText,
              onCompleteText
            );
          };

          /**
           * Reducing animation for stamp and presentText
           */
          const reduce = () => {
            const scaleX = stampWidth / Number(image.width);
            const scaleY = stampHeight / Number(image.height);
            const valuesToChangeStamp = { scaleX, scaleY };
            const valuesToChangeText = { scaleX: 0.5, scaleY: 0.5 };
            const duration = animationDurations.reducing;
            const easeEffect = fabric.util.ease.easeInQuad;
            const onComplete = afterShowingAction;

            window.setTimeout(() => {
              animateObject(
                image,
                valuesToChangeStamp,
                duration,
                easeEffect,
                onComplete
              );

              if (!presentText) return;

              animateObject(
                presentText,
                valuesToChangeText,
                duration,
                easeEffect,
                onComplete
              );
            }, animationDurations.staying);
          };

          /**
           * Growing animation for stamp and presentText
           */
          const growing = () => {
            const valuesToChange = { scaleX: 2, scaleY: 2 };
            const duration = animationDurations.growing;
            const easeEffect = fabric.util.ease.easeInQuad;
            const onComplete = reduce;

            animateObject(
              image,
              valuesToChange,
              duration,
              easeEffect,
              onComplete
            );

            if (!presentText) return;

            animateObject(
              presentText,
              valuesToChange,
              duration,
              easeEffect,
              onComplete
            );
          };

          growing();
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
    addPersistentEventStamp,
    animateObject,
    animationDurations.afterShowing,
    animationDurations.growing,
    animationDurations.reducing,
    animationDurations.staying,
    canvas,
    determineStampPosition,
    eventController,
    getStampsCountByStudentId,
    shouldHandleRemoteEvent,
    userId,
  ]);

  // Handling local. Send the event
  useEffect(() => {
    if (stampAssignedStudents.length) {
      /**
       * Checks if is necessary wait for send the next stamp event or not
       * @param index - Current stamp assigned students array index
       */
      const determineTimeout = (index: number) => {
        return !index || stampMode === 'student' ? 0 : totalDuration;
      };

      // Taking the current time
      const currentTime = new Date();
      let timeLeft = 0;

      if (startTime) {
        // Calculating timeElapsed since current animation start to now
        const timeElapsed = currentTime.getTime() - startTime.getTime();

        // Calculating time left to finish current animation
        if (stampMode === 'present') {
          timeLeft = stampAssignedStudents.length * totalDuration - timeElapsed;
        } else {
          timeLeft = totalDuration - timeElapsed;
        }
      }

      // Timeout for wait the end of the current animation
      setTimeout(() => {
        setStartTime(new Date());

        // Iterates over all the students that will recieve a stamp
        stampAssignedStudents.forEach((studentId, index) => {
          // Timeout to show stamps in a properly ordered way
          setTimeout(() => {
            const payload = {
              id: `${userId}:stamp`,
              target: {
                stampId: `${userId}:${uuidv4()}`,
                stamp,
                assignTo: studentId,
                stampMode: stampMode,
              },
            };

            eventSerializer.push('sendStamp', payload);
          }, determineTimeout(index));
        });
      }, timeLeft);

      updateStampAssignedStudents([]);
    }
  }, [
    eventSerializer,
    stamp,
    stampAssignedStudents,
    stampMode,
    startTime,
    totalDuration,
    updateStampAssignedStudents,
    userId,
  ]);
};

export default useSynchronizedSendStamp;
