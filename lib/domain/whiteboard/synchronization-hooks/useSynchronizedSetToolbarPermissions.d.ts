import { EventFilterFunction } from '../WhiteboardCanvas';
declare const useSynchronizedSetToolbarPermissions: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: EventFilterFunction, setToolbarIsEnabled: (enabled: boolean) => void) => void;
export default useSynchronizedSetToolbarPermissions;
