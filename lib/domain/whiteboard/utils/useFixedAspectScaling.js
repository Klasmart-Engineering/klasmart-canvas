import { useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
export default function useFixedAspectScaling(parent, aspectRatio, scaleMode) {
    var _a = useState(0.0), top = _a[0], setTop = _a[1];
    var _b = useState(0.0), left = _b[0], setLeft = _b[1];
    var _c = useState(0.0), width = _c[0], setWidth = _c[1];
    var _d = useState(0.0), height = _d[0], setHeight = _d[1];
    var updateLocationAndSize = useCallback(function (containerWidth, containerHeight) {
        var width = 0.0;
        var height = 0.0;
        var aspectCorrectedWidth = containerHeight * aspectRatio;
        var aspectCorrectedHeight = containerWidth / aspectRatio;
        if (scaleMode === "ScaleToFill") {
            if (aspectCorrectedWidth < containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            }
            else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        }
        else {
            if (aspectCorrectedWidth >= containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            }
            else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        }
        var offsetLeft = (containerWidth - width) / 2;
        setLeft(offsetLeft);
        var offsetTop = (containerHeight - height) / 2;
        setTop(offsetTop);
        setWidth(width);
        setHeight(height);
    }, [aspectRatio, scaleMode]);
    // NOTE: Set up resize observer.
    useEffect(function () {
        if (!parent)
            return;
        var ro = new ResizeObserver(function (entries, _observer) {
            entries.forEach(function (entry) {
                updateLocationAndSize(entry.contentRect.width, entry.contentRect.height);
            });
        });
        ro.observe(parent);
        return function () {
            ro.disconnect();
        };
    }, [parent, updateLocationAndSize]);
    return {
        top: top,
        left: left,
        width: width,
        height: height,
    };
}
//# sourceMappingURL=useFixedAspectScaling.js.map