import { useState } from 'react';
export var useFontColor = function (color) {
    if (color === void 0) { color = '#000000'; }
    var _a = useState(color), fontColor = _a[0], updateFontColor = _a[1];
    return { fontColor: fontColor, updateFontColor: updateFontColor };
};
//# sourceMappingURL=useFontColor.js.map