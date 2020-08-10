import { useState } from 'react';
export var useLineWidth = function (width) {
    if (width === void 0) { width = 2; }
    var _a = useState(width), lineWidth = _a[0], updateLineWidth = _a[1];
    return { lineWidth: lineWidth, updateLineWidth: updateLineWidth };
};
//# sourceMappingURL=useLineWidth.js.map