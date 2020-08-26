import { toolsSection } from "./toolbar-sections";
export var selectorOptionsWithId = function (id) {
    return toolsSection.elements
        .filter(function (t) {
        return t.id === id && t.hasOwnProperty('options');
    })
        .map(function (t) { return t.options; })[0];
};
export var selectorStyleOptionsWithId = function (id) {
    return toolsSection.elements
        .filter(function (t) {
        return t.id === id && t.hasOwnProperty('styleOptions');
    })
        .map(function (t) { return t.styleOptions; })[0];
};
//# sourceMappingURL=toolbar-utils.js.map