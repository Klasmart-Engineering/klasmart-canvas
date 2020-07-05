import React from 'react';

/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
function ToolbarSection({ children }: any) {
  return <div className="toolbar-section">{children}</div>;
}

export default ToolbarSection;
