import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import useFixedAspectScaling, {
  ScaleMode,
} from '../utils/useFixedAspectScaling';

export const useSetCanvas = (
  instanceId: string,
  setCanvas: (instance: fabric.Canvas) => void,
  canvas: fabric.Canvas,
  wrapper: HTMLElement,
  setWrapper: (wrapper: HTMLElement) => void,
  pixelWidth: number,
  pixelHeight: number,
  pointerEvents: boolean,
  scaleMode?: ScaleMode,
  display?: boolean,
  initialStyle?: React.CSSProperties
) => {
  const { requestAllEvents } = useSharedEventSerializer();
  const { width, height, top, left } = useFixedAspectScaling(
    wrapper?.parentElement,
    pixelWidth / pixelHeight,
    scaleMode || 'ScaleToFit'
  );
  const [lowerCanvas, setLowerCanvas] = useState<HTMLCanvasElement>();
  const [upperCanvas, setUpperCanvas] = useState<HTMLCanvasElement>();

  /**
   * Creates Canvas/Whiteboard instance
   */
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(instanceId, {
      backgroundColor: undefined,
      isDrawingMode: false,
      allowTouchScrolling: false,
      selectionBorderColor: 'rgba(100, 100, 255, 1)',
      selectionLineWidth: 2,
      selectionColor: 'rgba(100, 100, 255, 0.1)',
      selectionDashArray: [10],
    });

    setCanvas(canvasInstance);
  }, [instanceId, setCanvas]);

  /**
   * Enable or disable allow touch scroll based on pointer events.
   */
  useEffect(() => {
    if (!canvas) return;
    canvas.allowTouchScrolling = !pointerEvents;
  }, [pointerEvents, canvas]);

  /**
   * Request all events to be resent after canvas is created.
   */
  useEffect(() => {
    if (!canvas) return;

    requestAllEvents();
  }, [canvas, requestAllEvents]);

  /**
   * Retrieve references to elements created by fabricjs. We'll need these to
   * tweak the style after canvas have been initialized.
   */
  useEffect(() => {
    if (!canvas) return;

    const lowerCanvas = document.getElementById(instanceId);
    const wrapper = lowerCanvas?.parentElement;
    const upperCanvas = wrapper?.getElementsByClassName('upper-canvas')[0];

    if (wrapper) {
      setWrapper(wrapper);

      // TODO: We may want to make the position style
      // controlled by property or variable.
      wrapper.style.position = 'absolute';

      if (initialStyle && initialStyle.zIndex) {
        wrapper.style.zIndex = String(initialStyle.zIndex);
      }
    }
    if (lowerCanvas) setLowerCanvas(lowerCanvas as HTMLCanvasElement);
    if (upperCanvas) setUpperCanvas(upperCanvas as HTMLCanvasElement);
  }, [canvas, initialStyle, instanceId, setWrapper]);

  /**
   * Update wrapper display state.
   */
  useEffect(() => {
    if (!wrapper) return;

    if (display === false) {
      wrapper.style.display = 'none';
    } else {
      wrapper.style.removeProperty('display');
    }
  }, [wrapper, display]);

  /**
   * Update the CSS Width/Height
   */
  useEffect(() => {
    if (wrapper && lowerCanvas && upperCanvas) {
      const widthStyle = `${width}px`;
      wrapper.style.width = widthStyle;
      lowerCanvas.style.width = widthStyle;
      upperCanvas.style.width = widthStyle;

      const heightStyle = `${height}px`;
      wrapper.style.height = heightStyle;
      lowerCanvas.style.height = heightStyle;
      upperCanvas.style.height = heightStyle;

      const wrapperTransform = `translate(${left}px, ${top}px)`;
      wrapper.style.transform = wrapperTransform;

      wrapper.style.top = '0px';
      wrapper.style.left = '0px';
    }
  }, [wrapper, lowerCanvas, upperCanvas, width, height, left, top]);

  /**
   * Update the pointer events to make canvas click through.
   */
  useEffect(() => {
    if (wrapper && lowerCanvas && upperCanvas) {
      const pointerEventsStyle = pointerEvents ? 'auto' : 'none';

      wrapper.style.pointerEvents = pointerEventsStyle;
      lowerCanvas.style.pointerEvents = pointerEventsStyle;
      upperCanvas.style.pointerEvents = pointerEventsStyle;
    }
  }, [lowerCanvas, pointerEvents, upperCanvas, wrapper]);
};
