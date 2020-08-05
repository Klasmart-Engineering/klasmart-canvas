/// <reference types="react" />
import '../../../assets/style/toolbar-button.css';
import ISpecialButton from '../../../interfaces/toolbar/toolbar-special-elements/special-button';
/**
 * Render a button to use in the SpecialSelector
 * @param {ISpecialButton} props - Props needed to render the component:
 * - id - id that the button has
 * - title - title for the button
 * - Icon - Icon to use in the button
 * - style - style to set in that Icon
 * - selected - flag to set the button as selected or not
 * - onClick - Function to execute when the button is clicked
 */
declare function SpecialButton(props: ISpecialButton): JSX.Element;
export default SpecialButton;
