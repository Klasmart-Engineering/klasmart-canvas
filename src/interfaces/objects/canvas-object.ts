import { ObjectType } from '../../domain/whiteboard/event-serializer/PaintEventSerializer';
import { IBristle } from '../brushes/bristle';

export interface ICanvasObject extends fabric.Object {
  bristles?: IBristle[];
  _objects?: ICanvasObject[];
  objects?: ICanvasObject[];
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
  src?: string;
  joinedIds?: string[];
  isPartialErased?: boolean;
  active?: boolean;
  isActiveErase?: boolean;
  backgroundImage?: string | File;
  justForWatch?: boolean;
}
