import { Color } from './Palette';
export declare enum Drivers {
    GetImageColors = 0,
    Vibrant = 1,
    ColorThief = 2
}
export interface Driver {
    getPalette<T extends string>(src: T): Promise<Color[]>;
}
export default class {
    driver: Driver;
    constructor(driverType: Drivers);
    getPalette(src: string): Promise<Color[]>;
}
