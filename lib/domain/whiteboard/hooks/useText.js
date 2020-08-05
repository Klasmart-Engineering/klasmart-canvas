import { useState } from 'react';
export var useText = function (newText) {
    if (newText === void 0) { newText = ''; }
    var _a = useState(newText), text = _a[0], updateText = _a[1];
    return { text: text, updateText: updateText };
};
//# sourceMappingURL=useText.js.map