import { useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';

export const useStampFeature = () => {
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
