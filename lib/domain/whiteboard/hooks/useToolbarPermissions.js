import { useState } from 'react';
export var useToolbarPermissions = function () {
    var _a = useState(true), toolbarIsEnabled = _a[0], setToolbarIsEnabled = _a[1];
    return { toolbarIsEnabled: toolbarIsEnabled, setToolbarIsEnabled: setToolbarIsEnabled };
};
//# sourceMappingURL=useToolbarPermissions.js.map