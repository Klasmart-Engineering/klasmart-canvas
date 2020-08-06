import { PainterEventType } from './PainterEvent';
export interface IPainterController {
    on(event: PainterEventType, listener: (id: string, objectType: string, target: any) => void): this;
    removeListener(event: PainterEventType, listener: (id: string, objectType: string, target: any) => void): this;
    on(event: 'added', listener: (id: string, objectType: string, target: any) => void): this;
    on(event: 'moved', listener: (id: string, objectType: string, target: any) => void): this;
    on(event: 'rotated', listener: (id: string, objectType: string, target: any) => void): this;
    on(event: 'scaled', listener: (id: string, target: any) => void): this;
    on(event: 'skewed', listener: (id: string, target: any) => void): this;
    on(event: 'colorChanged', listener: (id: string, objectType: string, target: any) => void): this;
    on(event: 'modified', listener: (id: string, target: any) => void): this;
    on(event: 'fontFamilyChanged', listener: (id: string, target: any) => void): this;
    on(event: 'removed', listener: (id: string) => void): this;
    removeListener(event: 'added', listener: (id: string, objectType: string, target: any) => void): this;
    removeListener(event: 'moved', listener: (id: string, objectType: string, target: any) => void): this;
    removeListener(event: 'rotated', listener: (id: string, objectType: string, target: any) => void): this;
    removeListener(event: 'scaled', listener: (id: string, target: any) => void): this;
    removeListener(event: 'skewed', listener: (id: string, target: any) => void): this;
    removeListener(event: 'colorChanged', listener: (id: string, objectType: string, target: any) => void): this;
    removeListener(event: 'modified', listener: (id: string, target: any) => void): this;
    removeListener(event: 'fontFamilyChanged', listener: (id: string, target: any) => void): this;
    removeListener(event: 'removed', listener: (id: string) => void): this;
    replayEvents(): Promise<void>;
}
