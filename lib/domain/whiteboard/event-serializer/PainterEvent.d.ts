export declare type PainterEventType = 'added' | 'moved' | 'rotated' | 'scaled' | 'skewed' | 'colorChanged' | 'modified' | 'fontFamilyChanged' | 'removed' | 'reconstruct' | 'moving' | 'setToolbarPermissions' | 'fontColorChanged';
export interface PainterEvent {
    type: PainterEventType;
    id: string;
    objectType: string;
    param?: string | undefined;
}
