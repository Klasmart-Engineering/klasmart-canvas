import { useState } from 'react';
export var useShape = function (newShape) {
    if (newShape === void 0) { newShape = 'rectangle'; }
    var _a = useState(newShape), shape = _a[0], updateShape = _a[1];
    return { shape: shape, updateShape: updateShape };
};
//# sourceMappingURL=useShape.js.map