import { IBrushType } from '../../../interfaces/brushes/brush-type';
import { ISpecialShapeSelectorPropsType } from '../../../interfaces/canvas-events/special-shape-selector';
import { TypedShape } from '../../../interfaces/shapes/shapes';
import * as shapes from '../shapes/shapes';
interface IProps {
    brushType: IBrushType;
    lineWidth: number;
    penColor: string;
    shape: string;
    shapeColor: string;
    canvas?: fabric.Canvas;
}
/**
 * Selects shape
 * @param props Shape properties
 * @param specific Specified shape.
 */
export declare const shapeSelector: (props: IProps, specific: keyof typeof shapes | string) => TypedShape;
/**
 * Selects shape.
 * @param props Shape properties
 */
export declare function useShapeSelector(props: IProps): (specific: keyof typeof shapes | string) => TypedShape;
/**
 * Selects special (filled) shape.
 * @param userId User Id
 */
export declare function useSpecialShapeSelector(userId: string): (useProps: ISpecialShapeSelectorPropsType) => Promise<import("fabric/fabric-impl").Group | undefined>;
export {};
