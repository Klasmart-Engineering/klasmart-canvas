import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
function ToolbarSection({ children }: any) {

  const toolbarSectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    border: "solid 1px #d0d0d0",
    marginTop: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  }

  return <div className="toolbar-section" style={toolbarSectionStyle}>{children}</div>;
}

export default ToolbarSection;
