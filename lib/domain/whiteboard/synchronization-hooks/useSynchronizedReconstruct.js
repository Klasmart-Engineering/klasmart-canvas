var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useEffect } from 'react';
import { useSharedEventSerializer } from '../SharedEventSerializerProvider';
import { fabric } from 'fabric';
var useSynchronizedReconstruct = function (canvas, shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    useEffect(function () {
        var _a;
        var reconstruct = function (id, target) {
            var _a, _b;
            if (!shouldHandleRemoteEvent(id))
                return;
            (_a = canvas) === null || _a === void 0 ? void 0 : _a.forEachObject(function (obj) {
                var _a;
                if (obj.id !== id)
                    return;
                (_a = canvas) === null || _a === void 0 ? void 0 : _a.remove(obj);
                canvas.renderAll();
                var oObject = obj.toJSON(['strokeUniform', 'id']);
                var nObject = __assign(__assign({}, oObject), JSON.parse(target.param));
                switch (target.objectType) {
                    case 'path': {
                        fabric.Path.fromObject(nObject, function (path) {
                            canvas.add(path);
                        });
                        break;
                    }
                    case 'textbox': {
                        if (JSON.parse(target.param).fill) {
                            delete nObject.stroke;
                        }
                        else {
                            nObject = __assign(__assign({}, nObject), { fill: nObject.stroke });
                            delete nObject.stroke;
                        }
                        fabric.Textbox.fromObject(nObject, function (path) {
                            canvas.add(path);
                        });
                        break;
                    }
                }
            });
            (_b = canvas) === null || _b === void 0 ? void 0 : _b.renderAll();
        };
        (_a = eventController) === null || _a === void 0 ? void 0 : _a.on('reconstruct', reconstruct);
        return function () {
            var _a;
            (_a = eventController) === null || _a === void 0 ? void 0 : _a.removeListener('reconstruct', reconstruct);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
};
export default useSynchronizedReconstruct;
//# sourceMappingURL=useSynchronizedReconstruct.js.map