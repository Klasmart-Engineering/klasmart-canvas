import { IStampMode } from './stamp-mode';

export interface IStampSyncTarget {
  stamp: string;
  assignTo: string;
  stampMode: IStampMode;
}
