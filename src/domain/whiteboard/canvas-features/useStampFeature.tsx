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
    stampAssignedStudents,
    updateStampAssignedStudents,
    stampMode,
  } = useContext(WhiteboardContext);

  useEffect(() => {
    if (stampIsActive && stamp) {
      console.log('is active: ', stampIsActive);
      openStampModal();

      updateStampIsActive(false);
    }
  }, [openStampModal, stamp, stampIsActive, updateStampIsActive]);

  useEffect(() => {
    if (stampAssignedStudents.length) {
      stampAssignedStudents.forEach((studentId) => {
        const payload = {
          id: `${userId}:stamp`,
          target: {
            stamp,
            assignTo: studentId,
            stampMode: stampMode,
          },
        };

        console.log('sending', payload);
        eventSerializer.push('sendStamp', payload);
      });

      updateStampAssignedStudents([]);
    }
  }, [
    eventSerializer,
    stamp,
    stampAssignedStudents,
    stampIsActive,
    stampMode,
    updateStampAssignedStudents,
    updateStampIsActive,
    userId,
  ]);
};
