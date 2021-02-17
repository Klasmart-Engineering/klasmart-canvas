import { useState } from 'react';

export const useStampAssignedStudents = (studentIds: string[] = []) => {
  const [stampAssignedStudents, updateStampAssignedStudents] = useState(
    studentIds
  );
  return { stampAssignedStudents, updateStampAssignedStudents };
};
