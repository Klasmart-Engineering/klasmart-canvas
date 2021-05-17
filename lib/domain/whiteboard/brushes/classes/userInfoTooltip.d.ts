import { fabric } from 'fabric';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
/** Interface of the user info option selected variables. */
interface IUserInfoOption {
    value: string;
    label: string;
    rectWidth: number;
    rectHeight: number;
    textLeft: number;
    imgSize: number;
    imgLeft: number;
    imgTop: number;
}
/** Class responsible of creating a tooltip with the user info. */
export declare class UserInfoTooltip {
    private _left;
    private _top;
    private _rect;
    private _img;
    private _text;
    private _shapesGroup;
    private _objectId;
    displayUserInfo: string;
    private optionUserInfo;
    static instance: UserInfoTooltip;
    static exists: boolean;
    static infoOptions: IUserInfoOption[];
    /**
     * Singleton instance creator.
     * @param {string} displayUserInfo - The value of the selected option for displaying the info.
     */
    static createInstance(displayUserInfo?: string): UserInfoTooltip | undefined;
    /**
     * Create an user info tooltip.
     * @param {string} displayUserInfo - The value of the selected option for displaying the info.
     */
    private constructor();
    /**
     * Set displayUserInfo value.
     * @param {string} displayUserInfo - The value of the selected option for displaying the info.
     */
    private setInfoOption;
    /**
     * Create the 3 basic shapes of the tooltip group.
     */
    private setBasicShapes;
    /**
     * Get the left position value.
     * @return {number} The left value.
     */
    get left(): number;
    /**
     * Check if position parameters are equal to the one of the object.
     * @param {number} left - left value.
     * @param {number} top - top value.
     * @return {boolean}
     */
    isInSamePosition(left: number, top: number): boolean;
    /**
     * Set position values
     * @param {number} left - left value.
     * @param {number} top - top value.
     */
    setPosition(left: number, top: number): void;
    /**
     * Set user info
     * @param {string} imageUrl - url or base64 string of the avatar image.
     * @param {string} name - name of the user.
     */
    setUserInfo(imageUrl: string, name: string): void;
    /**
     * Set tooltip text
     * @param {string} text - text.
     */
    private setText;
    /**
     * Set image url
     * @param {string} url - url or base64 string.
     */
    private setImageUrl;
    /**
     * Check if tooltip is shown
     * @return {boolean}
     */
    isShown(): boolean;
    /**
     * Check if tooltip assigned object is the same than the parameter one which is beign hovered and the type is the same
     * @param {ICanvasObject} hoveredObject - canvasObject
     * @return {boolean}
     */
    hasTheSameObject(hoveredObject: ICanvasObject): boolean;
    /**
     * Check if tooltip type of display user info selected is the same than the parameter value
     * @param {string} displayUserInfo - displayUserInfo
     * @return {boolean}
     */
    hasTheSameSelectedType(displayUserInfo: string): boolean;
    /**
     * Remove the assigned object and reset display user info selected
     */
    reset(): void;
    /**
     * Assign a canvas object to the tooltip
     * @param {ICanvasObject} hoveredObject - canvasObject being hovered
     */
    private setObject;
    /**
     * Create the shapes fabric group according
     */
    private generateShapesGroup;
    /**
     *
     * @param {ICanvasObject} hoveredObject - hovered canvas object
     * @param {string} displayUserInfo - display option
     */
    getDrawing(hoveredObject: ICanvasObject, displayUserInfo: string): fabric.Group;
}
export {};
