interface IProps {
  backgroundImage?: string | File;
  backgroundColor?: string;
  localImage?: string | File;
  width: number;
  height: number;
  canvas: fabric.Canvas;
  onClose: (close: boolean) => void;
}

/**
 * Generates link to download canvas as image.
 * @param img Generated image from canvas.
 * @param ext Image extension
 * @param type Image type
 */
const generateLink = (img: string, ext: string, type: string): void => {
  const link = document.createElement('a'); // document.getElementById('canvasDownloader');
  const date = new Date();

  (link as HTMLElement).setAttribute(
    'download',
    `canvas${date.getTime()}.${ext}`
  );
  (link as HTMLElement).setAttribute(
    'href',
    img.replace(type, 'image/octet-stream')
  );
  (link as HTMLElement).click();
};

/**
 * Download method for canvas.
 * @param type Type of image, either png or jpg.
 */
export const downloadCanvas = (props: IProps, type: string) => {
  if (props.backgroundImage || props.localImage) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = props.width;
    canvas.height = props.height;

    var background = new Image();
    background.src =
      (props.backgroundImage as string) || (props.localImage as string);

    background.onload = () => {
      const ext = type === 'image/png' ? 'png' : 'jpg';

      if (ext === 'jpg' && ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, props.width, props.height);
        ctx.restore();
      }

      ctx?.drawImage(background, 0, 0, props.width, props.height);
      ctx?.drawImage(
        props.canvas.getElement(),
        0,
        0,
        props.width,
        props.height
      );

      const img = ((canvas as unknown) as HTMLCanvasElement).toDataURL(type, 1);

      generateLink(img, ext, type);
      props.onClose(false);
    };
  } else if (props.backgroundColor) {
    const currentColor = props.canvas.backgroundColor;
    props.canvas.backgroundColor = props.backgroundColor;

    const ext = type === 'image/png' ? 'png' : 'jpg';
    const img = ((props.canvas as unknown) as HTMLCanvasElement).toDataURL(
      type,
      1
    );

    generateLink(img, ext, type);
    props.onClose(false);
    props.canvas.backgroundColor = currentColor;
  } else {
    const ext = type === 'image/png' ? 'png' : 'jpg';
    const img = ((props.canvas as unknown) as HTMLCanvasElement).toDataURL(
      type,
      1
    );
    generateLink(img, ext, type);
    props.onClose(false);
  }
};
