import { useState } from 'react';
export var useEraseType = function (type) {
    if (type === void 0) { type = null; }
    var _a = useState(type), eraseType = _a[0], updateEraseType = _a[1];
    return { eraseType: eraseType, updateEraseType: updateEraseType };
};
//# sourceMappingURL=useEraseType.js.map