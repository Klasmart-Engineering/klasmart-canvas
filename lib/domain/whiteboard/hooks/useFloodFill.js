import { useState } from 'react';
export var useFloodFill = function (color) {
    if (color === void 0) { color = '#000000'; }
    var _a = useState(color), floodFill = _a[0], updateFloodFill = _a[1];
    return { floodFill: floodFill, updateFloodFill: updateFloodFill };
};
//# sourceMappingURL=useFloodFill.js.map