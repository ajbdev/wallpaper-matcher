"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.rgb = function (r, b, g) {
        var color = new Color();
        color.r = r;
        color.b = b;
        color.g = g;
        return color;
    };
    return Color;
}());
exports.Color = Color;
