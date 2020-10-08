import {Color} from './Palette';
import Vibrant from 'node-vibrant';
import GetImageColors from 'get-image-colors';

const ColorThief = require('colorthief');

export enum Drivers {
  GetImageColors,
  Vibrant,
  ColorThief
}

export interface Driver {
  getPalette(buffer: HTMLImageElement | Buffer | Uint8Array | ArrayBuffer | string): Promise<Color[]>
}

class ColorThiefDriver implements Driver {
  getPalette(buffer: HTMLImageElement | string): Promise<Color[]> {
    const result = ColorThief.getPalette(buffer, 6);

    return result.map((r:any) => Color.rgb(r[0], r[1], r[2]));
  }
}

class VibrantDriver implements Driver {
  async getPalette(buffer: HTMLImageElement | Buffer): Promise<Color[]> {
    const result = await Vibrant.from(buffer).getPalette();

    return ['Vibrant','Muted','DarkVibrant','DarkMuted','LightVibrant','LightMuted']
                    .filter(p => result.hasOwnProperty(p))
                    .map(p => Color.rgb(result[p]!.r,result[p]!.g,result[p]!.b));
  }
}

class GetImageColorsDriver implements Driver {
  async getPalette(buffer: string): Promise<Color[]> {
    const result = await GetImageColors(buffer);

    return result.map(r => Color.rgb(...r.rgb()));
  }
}


export default class {
  driver: Driver;

  constructor(driverType: Drivers) {
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

  getPalette(buffer: HTMLImageElement | Buffer | Uint8Array | ArrayBuffer | string): Promise<Color[]> {
    return this.driver.getPalette(buffer);
  }
}