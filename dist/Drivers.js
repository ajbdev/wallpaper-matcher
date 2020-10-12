"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drivers = void 0;
var Palette_1 = require("./Palette");
var node_vibrant_1 = __importDefault(require("node-vibrant"));
var get_image_colors_1 = __importDefault(require("get-image-colors"));
var ColorThief = require('colorthief').default;
//const inBrowser = typeof window === 'object' && window instanceof Window;
var Drivers;
(function (Drivers) {
    Drivers[Drivers["GetImageColors"] = 0] = "GetImageColors";
    Drivers[Drivers["Vibrant"] = 1] = "Vibrant";
    Drivers[Drivers["ColorThief"] = 2] = "ColorThief";
})(Drivers = exports.Drivers || (exports.Drivers = {}));
var ColorThiefDriver = /** @class */ (function () {
    function ColorThiefDriver() {
    }
    ColorThiefDriver.prototype.getPalette = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(ColorThief);
                        return [4 /*yield*/, ColorThief.getPalette(src, 6)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (r) { return Palette_1.Color.rgb(r[0], r[1], r[2]); })];
                }
            });
        });
    };
    return ColorThiefDriver;
}());
var VibrantDriver = /** @class */ (function () {
    function VibrantDriver() {
    }
    VibrantDriver.prototype.getPalette = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_vibrant_1.default.from(src).getPalette()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, ['Vibrant', 'Muted', 'DarkVibrant', 'DarkMuted', 'LightVibrant', 'LightMuted']
                                .filter(function (p) { return result.hasOwnProperty(p); })
                                .map(function (p) { return Palette_1.Color.rgb(result[p].r, result[p].g, result[p].b); })];
                }
            });
        });
    };
    return VibrantDriver;
}());
var GetImageColorsDriver = /** @class */ (function () {
    function GetImageColorsDriver() {
    }
    GetImageColorsDriver.prototype.getPalette = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, get_image_colors_1.default(src)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (r) { return Palette_1.Color.rgb.apply(Palette_1.Color, r.rgb()); })];
                }
            });
        });
    };
    return GetImageColorsDriver;
}());
var default_1 = /** @class */ (function () {
    function default_1(driverType) {
        switch (driverType) {
            case Drivers.GetImageColors:
                this.driver = new GetImageColorsDriver();
                break;
            case Drivers.Vibrant:
                this.driver = new VibrantDriver();
                break;
            case Drivers.ColorThief:
                this.driver = new ColorThiefDriver();
                break;
        }
    }
    default_1.prototype.getPalette = function (src) {
        return this.driver.getPalette(src);
    };
    return default_1;
}());
exports.default = default_1;
