import React from 'react';
/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
function ToolbarSection(_a) {
    var children = _a.children;
    var toolbarSectionStyle = {
        display: "flex",
        flexDirection: "column",
        border: "solid 1px #d0d0d0",
        marginTop: "16px",
        backgroundColor: "#fff",
        borderRadius: "8px",
    };
    return React.createElement("div", { className: "toolbar-section", style: toolbarSectionStyle }, children);
}
export default ToolbarSection;
//# sourceMappingURL=ToolbarSection.js.map