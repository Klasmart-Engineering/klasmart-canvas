var ID_DELIMITER = ":";
var ShapeID = /** @class */ (function () {
    function ShapeID(id) {
        this.full = id;
        var parts = id.split(ID_DELIMITER);
        if (!parts.length) {
            throw new Error("Invalid shape ID.");
        }
        this.user = parts[0];
        if (parts.length > 1) {
            this.index = Number.parseInt(parts[1]);
        }
        else {
            this.index = 0;
        }
    }
    ShapeID.create = function (user, index) {
        return "" + user + ID_DELIMITER + index;
    };
    return ShapeID;
}());
export { ShapeID };
//# sourceMappingURL=ShapeID.js.map