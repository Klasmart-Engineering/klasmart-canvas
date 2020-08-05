/// <reference types="react" />
import IToolbarButton from '../../../interfaces/toolbar/toolbar-button/toolbar-button';
import '../../../assets/style/toolbar-button.css';
/**
 * Render each button that will be included in the toolbar
 * @param {ToolbarButtonModel} props - Props that the button
 * need to be rendered:
 * - id - id to identify the button
 * - title - title for the button to show in on hover
 * - iconSrc - src for the icon button
 * - iconName - alt for the icon button
 * - selected - flag to set the current selected button
 * - onClick - event to send to parent when the button is clicked
 */
declare function ToolbarButton(props: IToolbarButton): JSX.Element;
export default ToolbarButton;
