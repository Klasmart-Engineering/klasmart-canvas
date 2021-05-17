import { fabric } from 'fabric';
declare const useSynchronizedSendStamp: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean) => void;
export default useSynchronizedSendStamp;
