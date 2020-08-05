import { useState } from 'react';
export var useFontFamily = function (font) {
    if (font === void 0) { font = 'Arial'; }
    var _a = useState(font), fontFamily = _a[0], updateFontFamily = _a[1];
    return { fontFamily: fontFamily, updateFontFamily: updateFontFamily };
};
//# sourceMappingURL=useFontFamily.js.map