import { useState } from 'react';
/**
 * Indicates of shapes are selectable and eventful.
 */
export var useShapesAreSelectable = function () {
    var _a = useState(false), shapesAreSelectable = _a[0], updateShapesAreSelectable = _a[1];
    return { shapesAreSelectable: shapesAreSelectable, updateShapesAreSelectable: updateShapesAreSelectable };
};
//# sourceMappingURL=useShapesAreSelectable.js.map