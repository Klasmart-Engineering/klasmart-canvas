/**
 * Synchronize to remote canvases background color changes
 * @param shouldHandleRemoteEvent - Validator to know
 * if synchronization is needed
 */
declare const useSynchronizedBackgroundColorChanged: (shouldHandleRemoteEvent: (id: string) => boolean) => void;
export default useSynchronizedBackgroundColorChanged;
