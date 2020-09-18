import { TypedShape } from "../../../interfaces/shapes/shapes";

export const findTopLeftOfCollection = (collection: TypedShape[]) => {
  let top: number | null = null;
  let left: number | null = null;

  collection.forEach((o: TypedShape) => {
    top = top === null ? o.top as number : o.top as number < top ? o.top as number : top;
    left = left === null ? o.left as number : o.left as number < left ? o.left as number : left;
  });

  return { top, left };
}