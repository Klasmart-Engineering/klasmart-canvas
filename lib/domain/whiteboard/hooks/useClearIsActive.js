import { useState } from 'react';
export var useClearIsActive = function () {
    var _a = useState(false), clearIsActive = _a[0], updateClearIsActive = _a[1];
    return { clearIsActive: clearIsActive, updateClearIsActive: updateClearIsActive };
};
//# sourceMappingURL=useClearIsActive.js.map