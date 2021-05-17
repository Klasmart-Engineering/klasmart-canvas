declare const useSynchronizedSetToolbarPermissions: (canvas: fabric.Canvas | undefined, userId: string, shouldHandleRemoteEvent: (id: string) => boolean, updatePermissions: (tool: string, payload: boolean) => any) => void;
export default useSynchronizedSetToolbarPermissions;
