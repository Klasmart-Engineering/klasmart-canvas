/// <reference types="react" />
import '../toolbar-selector/toolbar-selector.css';
import ISpecialSelector from '../../../interfaces/toolbar/toolbar-special-elements/toolbar-special-selector';
/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - id - id that the element has
 * - Icon - Icon to set in the options
 * - active - flag to set if the element is selected or not
 * - selectedValue - Selected value setted by parent
 * - styleOptions - Icon styles in the different options
 * - onClick - Function to execute when the element is clicked
 * - onChange - Function to execute when the value changes
 */
declare function SpecialSelector(props: ISpecialSelector): JSX.Element;
export default SpecialSelector;
