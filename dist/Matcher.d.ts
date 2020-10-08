import Driver from './Drivers';
export default class Matcher {
    driver: Driver;
    sets: string[][];
    constructor(...sets: string[][]);
    getColorPalettes(buffers: string[]): Promise<{
        buffer: string;
        palette: import("./Palette").Color[];
    }[]>;
    match(): Promise<void>;
    setLibrary(lib: 'node-vibrant' | 'colorthief' | 'get-image-colors'): void;
}
