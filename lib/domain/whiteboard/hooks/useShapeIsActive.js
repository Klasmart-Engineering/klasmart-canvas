import { useState } from 'react';
export var useShapeIsActive = function () {
    var _a = useState(false), shapeIsActive = _a[0], updateShapeIsActive = _a[1];
    return { shapeIsActive: shapeIsActive, updateShapeIsActive: updateShapeIsActive };
};
//# sourceMappingURL=useShapeIsActive.js.map