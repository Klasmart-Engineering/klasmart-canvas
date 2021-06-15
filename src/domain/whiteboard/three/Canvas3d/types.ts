import { PaintEventSerializer } from '../../../../poc/whiteboard/event-serializer/PaintEventSerializer';
import { I3dObject } from '../I3dObject';

export type ICanvas3dProps = {
  userId: string;
  ownerId: string;
  width: number;
  height: number;
  eventSerializer: PaintEventSerializer;
  canvasId: string;
  isOwn: boolean;
  json?: I3dObject;
};

export type ICanvas3dState = {
  isActive: boolean;
};
