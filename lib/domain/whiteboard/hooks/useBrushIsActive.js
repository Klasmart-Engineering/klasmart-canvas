import { useState } from 'react';
export var useBrushIsActive = function () {
    var _a = useState(false), brushIsActive = _a[0], updateBrushIsActive = _a[1];
    return { brushIsActive: brushIsActive, updateBrushIsActive: updateBrushIsActive };
};
//# sourceMappingURL=useBrushIsActive.js.map