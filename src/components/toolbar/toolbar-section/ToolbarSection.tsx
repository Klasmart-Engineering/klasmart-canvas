import React from 'react';

interface IToolbarSectionComponent {
  children: React.ReactNode;
}

/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
function ToolbarSection({ children }: IToolbarSectionComponent) {
  const toolbarSectionStyle: React.CSSProperties = {
    width: '52px',
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 1px #d0d0d0',
    backgroundColor: '#fff',
    borderRadius: '8px',
  };

  return (
    <div className="toolbar-section" style={toolbarSectionStyle}>
      {children}
    </div>
  );
}

export default ToolbarSection;
