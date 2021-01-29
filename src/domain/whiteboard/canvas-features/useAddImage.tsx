import { useContext, useEffect } from 'react';
import { IBackgroundImageEvent } from '../event-serializer/PaintEventSerializer';
import {
  createBackgroundImage,
  createGif,
  createImageAsObject,
} from '../gifs-actions/util';
import { WhiteboardContext } from '../WhiteboardContext';
import { v4 as uuidv4 } from 'uuid';
import { IStaticCanvasOptions } from 'fabric/fabric-impl';

interface IBackgroundImage extends IStaticCanvasOptions {
  id?: string;
}

/**
 * Handles the logic for upload images on Whiteboard
 * (image objects and background images)
 * @param {fabric.Canvas} canvas - Canvas to set the image
 * @param {string} userId - User that will set the image
 */
export const useAddImage = (canvas: fabric.Canvas, userId: string) => {
  // Getting context variables
  const {
    isBackgroundImage,
    backgroundImageIsPartialErasable,
    backgroundImage,
    setLocalImage,
    setLocalBackground,
    updateBackgroundColor,
    isGif,
    image,
  } = useContext(WhiteboardContext);

  /**
   * Handles the logic to add images and gifs as objects
   * and background images to the whiteboard.
   */
  useEffect(() => {
    if (!canvas) return;

    const imageSetup = async () => {
      try {
        if (isBackgroundImage) {
          updateBackgroundColor('transparent');
          setLocalBackground(false);
          canvas.setBackgroundColor(
            'transparent',
            canvas.renderAll.bind(canvas)
          );

          if (backgroundImageIsPartialErasable) {
            await createBackgroundImage(
              backgroundImage.toString(),
              userId,
              canvas
            );

            if (!canvas.backgroundImage) return;

            const payload: IBackgroundImageEvent = {
              id: (canvas.backgroundImage as IBackgroundImage).id,
              type: 'backgroundImage',
              target: canvas.backgroundImage,
            };

            canvas.trigger('object:added', payload);
            return;
          }

          await setLocalImage(backgroundImage);
          const id = `${userId}:${uuidv4()}`;
          const payload: IBackgroundImageEvent = {
            type: 'localImage',
            target: { backgroundImage, id },
            id,
          };

          canvas.trigger('object:added', payload);

          return;
        }

        if (isGif && image) {
          /*
            We use then to avoid inspector warning
            about ignoring the promise returned
          */
          await createGif(image, userId, canvas);
          return;
        }

        if (image && !isGif) {
          createImageAsObject(image as string, userId, canvas);
        }
      } catch (e) {
        console.error(e);
      }
    };

    imageSetup();
  }, [
    backgroundImage,
    backgroundImageIsPartialErasable,
    canvas,
    image,
    isBackgroundImage,
    isGif,
    setLocalBackground,
    setLocalImage,
    updateBackgroundColor,
    userId,
  ]);
};
