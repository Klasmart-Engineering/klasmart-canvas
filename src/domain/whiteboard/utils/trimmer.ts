
interface IBound {
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
}

export const trimmer = (c: any) => {
  const ctx = c.getContext('2d');
  let copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, c.width, c.height),
      l = pixels.data.length,
      i,
      bound: IBound = {
          top: null,
          left: null,
          right: null,
          bottom: null
      },
      x, y;
  
  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
          x = (i / 4) % c.width;
          y = ~~((i / 4) / c.width);

          if (bound.top === null) {
              bound.top = y;
          }

          if (bound.left === null) {
              bound.left = x;
          } else if (x < bound.left) {
              bound.left = x;
          }

          if (bound.right === null) {
              bound.right = x;
          } else if (bound.right < x) {
              bound.right = x;
          }

          if (bound.bottom === null) {
              bound.bottom = y;
          } else if (bound.bottom < y) {
              bound.bottom = y;
          }
      }
  }
  
  // Calculate the height and width of the content
  var trimHeight = (bound.bottom as number) - (bound.top as number),
      trimWidth = (bound.right as number) - (bound.left as number),
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  if (copy) {
    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    return copy.canvas;
  }

  return c;
}