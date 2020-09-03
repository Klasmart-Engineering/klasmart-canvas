import { useState } from 'react';
/**
 * Hook that updates and indicates if laser pointer is active.
 */
export var useLaserIsActive = function () {
    var _a = useState(false), laserIsActive = _a[0], updateLaserIsActive = _a[1];
    return { laserIsActive: laserIsActive, updateLaserIsActive: updateLaserIsActive };
};
/**
 * Hook that updates and indicates if laser pointer is available.
 */
export var useLaserIsAvailable = function () {
    var _a = useState(false), laserIsAvailable = _a[0], updateLaserIsAvailable = _a[1];
    return { laserIsAvailable: laserIsAvailable, updateLaserIsAvailable: updateLaserIsAvailable };
};
//# sourceMappingURL=useLaserIsActive.js.map