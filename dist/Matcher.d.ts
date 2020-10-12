import { Color } from './Palette';
interface BufferPalette {
    [key: string]: Color[];
}
export default class Matcher {
    private driver;
    readonly sets: string[][];
    readonly palettes: BufferPalette;
    constructor(...sets: string[][]);
    getColorPalette(buffer: string): Promise<Color[]>;
    getColorPalettes(buffers: string[]): Promise<BufferPalette>;
    match(): Promise<void>;
    setLibrary(lib: 'node-vibrant' | 'colorthief' | 'get-image-colors'): void;
}
export {};
