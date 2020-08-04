import { PainterEventType } from './PainterEvent';

export interface IPainterController {
  on(
    event: PainterEventType,
    listener: (id: string, objectType: string, target: any) => void
  ): this;
  removeListener(
    event: PainterEventType,
    listener: (id: string, objectType: string, target: any) => void
  ): this;

  // TODO: Theres a "ease of use" concern we should think about with this event interface. We can
  // choose to consolidate all events in one single event or we can have specific events for each
  // operation. I think both ways work, but if we have a huge amount of event types code listening
  // to the event will have to handle dispatch manually. It might be a help for the caller if
  // dispatch is handled by the controller. Example:
  //
  // Caller handle dispatch:
  // on(event: PainterEventType ...)
  //
  // Controller handle dispatch:
  // on(event: "add" ...)
  // on(event: "delete" ...)
  // etc.

  on(
    event: 'added',
    listener: (id: string, objectType: string, target: any) => void
  ): this;
  on(event: 'moved', listener: (id: string, target: any) => void): this;
  on(event: 'rotated', listener: (id: string, target: any) => void): this;
  on(event: 'scaled', listener: (id: string, target: any) => void): this;
  on(event: 'skewed', listener: (id: string, target: any) => void): this;
  on(
    event: 'colorChanged',
    listener: (id: string, objectType: string, target: any) => void
  ): this;
  on(event: 'modified', listener: (id: string, target: any) => void): this;
  on(
    event: 'fontFamilyChanged',
    listener: (id: string, target: any) => void
  ): this;
  on(event: 'removed', listener: (id: string) => void): this;

  removeListener(
    event: 'added',
    listener: (id: string, objectType: string, target: any) => void
  ): this;
  removeListener(
    event: 'moved',
    listener: (id: string, target: any) => void
  ): this;
  removeListener(
    event: 'scaled',
    listener: (id: string, target: any) => void
  ): this;
  removeListener(
    event: 'skewed',
    listener: (id: string, target: any) => void
  ): this;
  removeListener(
    event: 'colorChanged',
    listener: (id: string, objectType: string, target: any) => void
  ): this;
  removeListener(
    event: 'modified',
    listener: (id: string, target: any) => void
  ): this;
  removeListener(
    event: 'fontFamilyChanged',
    listener: (id: string, target: any) => void
  ): this;
  removeListener(event: 'removed', listener: (id: string) => void): this;

  replayEvents(): Promise<void>;
}
