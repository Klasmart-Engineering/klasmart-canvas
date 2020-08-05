import { useState } from 'react';
export var useTextIsActive = function () {
    var _a = useState(false), textIsActive = _a[0], updateTextIsActive = _a[1];
    return { textIsActive: textIsActive, updateTextIsActive: updateTextIsActive };
};
//# sourceMappingURL=useTextIsActive.js.map