import Driver, { Drivers } from './Drivers';
import {Color} from './Palette';

interface BufferPalette {
  [key:string]: Color[]
}

export default class Matcher {
  private driver: Driver;
  readonly sets: string[][];
  readonly palettes: BufferPalette;

  constructor(...sets: string[][]) {
    this.driver = new Driver(Drivers.ColorThief);

    this.sets = sets;
    this.palettes = {}
  }

  async getColorPalette(buffer: string) {
    this.palettes[buffer] = await this.driver.getPalette(buffer);

    return this.palettes[buffer];
  }


  async getColorPalettes(buffers: string[]) {
    await Promise.all(buffers.map(async buffer => this.getColorPalette(buffer)));

    return this.palettes;
  }

  async match() {
    await Promise.all(this.sets.map(async buffers => this.getColorPalettes(buffers)));
  }

  setLibrary(lib: 'node-vibrant' | 'colorthief' | 'get-image-colors') {
    this.driver = new Driver({
      'node-vibrant': Drivers.Vibrant,
      'colorthief': Drivers.ColorThief,
      'get-image-colors': Drivers.GetImageColors
    }[lib]);
  }
}

