import { useState } from 'react';
export var usePointerEvents = function (newState) {
    if (newState === void 0) { newState = true; }
    var _a = useState(newState), pointerEvents = _a[0], setPointerEvents = _a[1];
    return { pointerEvents: pointerEvents, setPointerEvents: setPointerEvents };
};
//# sourceMappingURL=usePointerEvents.js.map