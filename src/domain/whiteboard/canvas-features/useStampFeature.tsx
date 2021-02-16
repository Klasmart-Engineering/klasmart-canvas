import { useContext, useEffect } from 'react';
import { PaintEventSerializer } from '../event-serializer/PaintEventSerializer';
import { WhiteboardContext } from '../WhiteboardContext';

export const useStampFeature = (
  userId: string,
  eventSerializer: PaintEventSerializer
) => {
  const {
    stampIsActive,
    openStampModal,
    updateStampIsActive,
    stamp,
  } = useContext(WhiteboardContext);

  useEffect(() => {
    if (stampIsActive && stamp) {
      console.log('is active: ', stampIsActive);
      openStampModal();

      updateStampIsActive(false);
    }
  }, [openStampModal, stamp, stampIsActive, updateStampIsActive]);
};
