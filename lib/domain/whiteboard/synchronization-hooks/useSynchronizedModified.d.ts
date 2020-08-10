declare const useSynchronizedModified: (canvas: import("fabric/fabric-impl").Canvas | undefined, shouldSerializeEvent: (id: string) => boolean, shouldHandleRemoteEvent: (id: string) => boolean) => void;
export default useSynchronizedModified;
