import {
  ObjectEvent,
  PaintEventSerializer,
  PayloadTarget,
} from '../event-serializer/PaintEventSerializer';

/**
 * Creates payload with the given id and target
 * and send reconstruct event with the created payload
 * @param {string} id - Object id for payload
 * @param {PayloadTarget} target - Target to send in payload
 */
export const sendReconstructEvent = (
  id: string,
  target: PayloadTarget,
  eventSerializer: PaintEventSerializer
) => {
  const payload = {
    id,
    target,
    type: 'reconstruct',
  } as ObjectEvent;

  eventSerializer?.push('reconstruct', payload);
};
