export declare type PainterEventType = 'added' | 'moved' | 'rotated' | 'scaled' | 'skewed' | 'colorChanged' | 'modified' | 'fontFamilyChanged' | 'removed' | 'reconstruct' | 'moving' | 'setToolbarPermissions' | 'fontColorChanged' | 'lineWidthChanged';
export interface PainterEvent {
    type: PainterEventType;
    id: string;
    generatedBy: string;
    objectType: string;
    param?: string | undefined;
}
