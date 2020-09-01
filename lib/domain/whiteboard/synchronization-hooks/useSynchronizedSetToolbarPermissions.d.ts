declare const useSynchronizedSetToolbarPermissions: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean, setToolbarIsEnabled: (enabled: boolean) => void) => void;
export default useSynchronizedSetToolbarPermissions;
