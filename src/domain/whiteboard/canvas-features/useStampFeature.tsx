import { useContext, useEffect } from 'react';
import { WhiteboardContext } from '../WhiteboardContext';

export const useStampFeature = () => {
  const {
    stampIsActive,
    openStampModal,
    updateStampIsActive,
    stamp,
  } = useContext(WhiteboardContext);

  /**
   * Checks stampIsActive to show the assignation stamp modal
   */
  useEffect(() => {
    if (stampIsActive && stamp) {
      openStampModal();

      updateStampIsActive(false);
    }
  }, [openStampModal, stamp, stampIsActive, updateStampIsActive]);
};
