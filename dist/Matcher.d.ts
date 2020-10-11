import Driver from './Drivers';
import { Color } from './Palette';
interface BufferPalette {
    [key: string]: Color[];
}
export default class Matcher {
    driver: Driver;
    sets: string[][];
    palettes: BufferPalette;
    constructor(...sets: string[][]);
    getColorPalette(buffer: string): Promise<Color[]>;
    getColorPalettes(buffers: string[]): Promise<BufferPalette>;
    match(): Promise<void>;
    setLibrary(lib: 'node-vibrant' | 'colorthief' | 'get-image-colors'): void;
}
export {};
