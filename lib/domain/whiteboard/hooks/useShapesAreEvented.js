import { useState } from 'react';
/**
 * Indicates of shapes are eventful.
 */
export var useShapesAreEvented = function () {
    var _a = useState(false), shapesAreEvented = _a[0], updateShapesAreEvented = _a[1];
    return { shapesAreEvented: shapesAreEvented, updateShapesAreEvented: updateShapesAreEvented };
};
//# sourceMappingURL=useShapesAreEvented.js.map