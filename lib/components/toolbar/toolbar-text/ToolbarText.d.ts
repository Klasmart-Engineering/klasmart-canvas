/// <reference types="react" />
import '../toolbar.css';
interface IToolbarText {
    showInput: boolean;
    text: string;
    updateText: (value: string) => void;
    writeText: (e: any) => void;
}
/**
 * Render an InputText below of the toolbar
 * @param {IToolbarText} props - Props that the component need to be rendered:
 * - showInput - flag tho show/hide the input
 * - text - value that the input field will have
 * - updateText - function to execute when the field value changes
 * - writeText (provisionaly optional) -
 *   function to execute when the user keydown a key
 */
declare function ToolbarText(props: IToolbarText): JSX.Element;
export default ToolbarText;
