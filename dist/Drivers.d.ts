/// <reference types="node" />
import { Color } from './Palette';
export declare enum Drivers {
    GetImageColors = 0,
    Vibrant = 1,
    ColorThief = 2
}
export interface Driver {
    getPalette(buffer: HTMLImageElement | Buffer): Promise<Color[]>;
}
export default class {
    driver: Driver;
    constructor(driverType: Drivers);
    getPalette(buffer: HTMLImageElement | Buffer | Uint8Array | ArrayBuffer | string): Promise<Color[]>;
}
