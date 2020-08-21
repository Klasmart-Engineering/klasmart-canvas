import { useState } from 'react';

/**
 * Hook that updates and indicates if laser pointer is active.
 */
export const useLaserIsActive = () => {
  const [laserIsActive, updateLaserIsActive] = useState(false);
  return { laserIsActive, updateLaserIsActive };
};

/**
 * Hook that updates and indicates if laser pointer is available.
 */
export const useLaserIsAvailable = () => {
  const [laserIsAvailable, updateLaserIsAvailable] = useState(false);
  return { laserIsAvailable, updateLaserIsAvailable };
};
