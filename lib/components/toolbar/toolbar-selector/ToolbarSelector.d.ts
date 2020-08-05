/// <reference types="react" />
import './toolbar-selector.css';
import IToolbarSelector from '../../../interfaces/toolbar/toolbar-selector/toolbar-selector';
/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - id - id that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - selectedValue - selected value setted by parent
 * - colorPalette (optional) - Contains the icon and onChangeColor method
 *   for the color palette (if required)
 * - onAction - event that is emitted to parent when action is triggered
 * - onClick - event that is emitted to parent when selector is clicked
 * - onChange - event that is emitted to parent when selector's value is changed
 */
declare function ToolbarSelector(props: IToolbarSelector): JSX.Element;
export default ToolbarSelector;
