import { PaintEventSerializer, PayloadTarget } from '../event-serializer/PaintEventSerializer';
/**
 * Creates payload with the given id and target
 * and send reconstruct event with the created payload
 * @param {string} id - Object id for payload
 * @param {PayloadTarget} target - Target to send in payload
 */
export declare const sendReconstructEvent: (id: string, target: PayloadTarget, eventSerializer: PaintEventSerializer) => void;
