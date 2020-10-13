import {Color} from './Palette';
import Vibrant from 'node-vibrant';
import GetImageColors from 'get-image-colors';

const ColorThief = require('colorthief').default;

//const inBrowser = typeof window === 'object' && window instanceof Window;

export enum Drivers {
  GetImageColors,
  Vibrant,
  ColorThief
}

export interface Driver {
  getPalette<T extends string>(src: T): Promise<Color[]>
}

class ColorThiefDriver implements Driver {
  private cf: any;
  constructor() {
    this.cf = new ColorThief();
  }

  async getPalette<T extends string>(src: T): Promise<Color[]> {
    const result = await this.cf.getPalette(src, 6);

    return result.map((r:any) => Color.rgb(r[0], r[1], r[2]));
  }
}

class VibrantDriver implements Driver {
  async getPalette<T extends string>(src: T): Promise<Color[]> {
    const result = await Vibrant.from(src).getPalette();

    return ['Vibrant','Muted','DarkVibrant','DarkMuted','LightVibrant','LightMuted']
                    .filter(p => result.hasOwnProperty(p))
                    .map(p => Color.rgb(result[p]!.r,result[p]!.g,result[p]!.b));
  }
}

class GetImageColorsDriver implements Driver {
  async getPalette<T extends string>(src: T): Promise<Color[]> {
    const result = await GetImageColors(src);

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

  getPalette(src: string) {
    return this.driver.getPalette(src);
  }
}