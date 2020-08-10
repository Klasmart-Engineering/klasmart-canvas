import { useState } from 'react';
export var useFloodFillIsActive = function () {
    var _a = useState(false), floodFillIsActive = _a[0], updateFloodFillIsActive = _a[1];
    return { floodFillIsActive: floodFillIsActive, updateFloodFillIsActive: updateFloodFillIsActive };
};
//# sourceMappingURL=useFloodFillIsActive.js.map