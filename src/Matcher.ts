import Driver, { Drivers } from './Drivers';

export default class Matcher {
  driver: Driver;
  sets: string[][];

  constructor(...sets: string[][]) {
    this.driver = new Driver(Drivers.Vibrant);

    this.sets = sets;
  }


  async getColorPalettes(buffers: string[]) {
    return await Promise.all(buffers.map(async buffer => { 
      const palette = await this.driver.getPalette(buffer);
    
      return {
        buffer: buffer,
        palette: palette
      }
    }));
  }

  async match() {
    const sets = await Promise.all(
      this.sets.map((buffers: string[]) => {
        return this.getColorPalettes(buffers);
      })
    )

    console.log(sets);
  }

  setLibrary(lib: 'node-vibrant' | 'colorthief' | 'get-image-colors') {
    this.driver = new Driver({
      'node-vibrant': Drivers.Vibrant,
      'colorthief': Drivers.ColorThief,
      'get-image-colors': Drivers.GetImageColors
    }[lib]);
  }
}

