import { useState } from 'react';
export var useShapeColor = function (color) {
    if (color === void 0) { color = '#000'; }
    var _a = useState(color), shapeColor = _a[0], updateShapeColor = _a[1];
    return { shapeColor: shapeColor, updateShapeColor: updateShapeColor };
};
//# sourceMappingURL=useShapeColor.js.map