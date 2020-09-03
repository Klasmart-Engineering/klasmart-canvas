import React from 'react';
interface IToolbarSectionComponent {
    children: React.ReactNode;
}
/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
declare function ToolbarSection({ children }: IToolbarSectionComponent): JSX.Element;
export default ToolbarSection;
