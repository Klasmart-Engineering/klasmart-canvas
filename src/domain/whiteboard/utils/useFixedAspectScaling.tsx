import { useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type ScaleMode = "ScaleToFit" | "ScaleToFill" | "ScaleFitHorizontally" | "ScaleFitVertically";

export default function useFixedAspectScaling(parent: Element | undefined | null, aspectRatio: number, scaleMode: ScaleMode) {
    const [top, setTop] = useState<number>(0.0);
    const [left, setLeft] = useState<number>(0.0);
    const [width, setWidth] = useState<number>(0.0);
    const [height, setHeight] = useState<number>(0.0);

    const updateLocationAndSize = useCallback((containerWidth: number, containerHeight: number) => {
        let width = 0.0;
        let height = 0.0;

        const aspectCorrectedWidth = containerHeight * aspectRatio;
        const aspectCorrectedHeight = containerWidth / aspectRatio;

        if (scaleMode === "ScaleToFill") {
            if (aspectCorrectedWidth < containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            } else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        } else if (scaleMode === "ScaleToFit") {
            if (aspectCorrectedWidth >= containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            } else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        } else if (scaleMode === "ScaleFitVertically") {
            width = aspectCorrectedWidth;
            height = containerHeight;
        } else if (scaleMode === "ScaleFitHorizontally") {
            width = containerWidth;
            height = aspectCorrectedHeight;
        }

        const offsetLeft = (containerWidth - width) / 2;
        setLeft(offsetLeft);

        const offsetTop = (containerHeight - height) / 2;
        setTop(offsetTop);

        setWidth(width);
        setHeight(height);
    }, [aspectRatio, scaleMode]);

    // NOTE: Set up resize observer.
    useEffect(() => {
        if (!parent) return;

        const ro = new ResizeObserver((entries, _observer) => {
            entries.forEach(entry => {
                updateLocationAndSize(entry.contentRect.width, entry.contentRect.height);
            });
        });

        ro.observe(parent);

        return () => {
            ro.disconnect();
        }
    }, [parent, updateLocationAndSize]);

    return {
        top,
        left,
        width,
        height,
    }
}