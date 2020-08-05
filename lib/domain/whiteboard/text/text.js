import { fabric } from 'fabric';
function createText(text, fontFamily) {
    return new fabric.Text(text, {
        fontFamily: fontFamily,
    });
}
function updateFont(updateFontFamily, fontFamily) {
    updateFontFamily(fontFamily);
}
export var textHandler = function (text, fontFamily, updateFontFamily) {
    var textFabric = createText(text, fontFamily);
    textFabric.on('selected', function () {
        if (textFabric.fontFamily) {
            updateFont(updateFontFamily, textFabric.fontFamily);
        }
    });
    textFabric.on('deselected', function () {
        updateFont(updateFontFamily, 'Arial');
    });
    return textFabric;
};
//# sourceMappingURL=text.js.map