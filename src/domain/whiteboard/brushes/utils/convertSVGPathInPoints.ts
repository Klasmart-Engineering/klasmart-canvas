export const convertSVGPathInPoints = (path: fabric.Path) => {
  return path
    .toSVG()
    .split('"')
    .find((element: string) => element.startsWith('M'))
    ?.split(/ ([MQL] [\d+ .]+)/gm)
    .map((element: string) => element.trim())
    .map((value: string, index: number, array: string[]) => {
      const parts = (value || array[index - 1]).split(' ');
      return {
        x: Number(parts[1]),
        y: Number(parts[2]),
      };
    });
};
