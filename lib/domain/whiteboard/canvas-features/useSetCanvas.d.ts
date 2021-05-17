/// <reference types="react" />
import { fabric } from 'fabric';
/**
 * Mnages the logic for set canvas properties
 * @param {string} instanceId - Unique ID for current canvas
 * @param {(instance: fabric.Canvas) => void} setCanvas - Creates a new canvas
 * @param {fabric.Canvas} canvas - Canvas to set
 * @param {HTMLElement} wrapper - Canvas wrapper
 * @param {(wrapper: HTMLElement) => void} setWrapper - Creates wrapper
 * for canvas
 * @param {number} pixelWidth - Canvas width
 * @param {number} pixelHeight - Canvas height
 * @param {boolean} pointerEvents - Enable or disable pointer interaction
 * @param {ScaleMode} scaleMode - Determines how the canvas should scale
 * if parent element doesn't match aspect ratio.
 * @param {boolean} display - Flag to display elements.
 * @param {React.CSSProperties} initialStyle - Canvas initial style.
 */
export declare const useSetCanvas: (instanceId: string, setCanvas: (instance: fabric.Canvas) => void, canvas: fabric.Canvas, wrapper: HTMLElement, setWrapper: (wrapper: HTMLElement) => void, pixelWidth: number, pixelHeight: number, pointerEvents: boolean, scaleMode?: "ScaleToFit" | "ScaleToFill" | "ScaleFitHorizontally" | "ScaleFitVertically" | undefined, display?: boolean | undefined, initialStyle?: import("react").CSSProperties | undefined) => void;
