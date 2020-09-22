import { ObjectType } from '../../domain/whiteboard/event-serializer/PaintEventSerializer';

export interface ICanvasObject extends fabric.Object {
  _objects?: ICanvasObject[];
  id?: string;
  path?: string | ICanvasObject;
  text?: string;
  fontFamily?: string;
  objectType?: ObjectType;
  param?: string;
  objectsOrdering?: {
    id: string;
    index: number;
  }[];
  strategy?: string;
  userId?: string;
  groupClear?: boolean;
  target?: ICanvasObject;
  activeIds?: string[];
  eTarget?: ICanvasObject;
  isGroup?: boolean;
}
