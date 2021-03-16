import { IStampMode } from './stamp-mode';

export interface IStampSyncTarget {
  stampId: string;
  stamp: string;
  assignTo: string;
  stampMode: IStampMode;
}
