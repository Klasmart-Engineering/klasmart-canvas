export declare class ShapeID {
    readonly full: string;
    readonly user: string;
    readonly index: number;
    constructor(id: string);
    static create(user: string, index: number): string;
}
