"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.rgb = function (r, g, b) {
        var color = new Color();
        color.r = r;
        color.g = g;
        color.b = b;
        return color;
    };
    Color.prototype.hex = function () {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    };
    return Color;
}());
exports.Color = Color;
