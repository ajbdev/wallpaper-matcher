export class Color {
  r: number;
  b: number;
  g: number;

  private constructor() {}

  static rgb(r:number,g:number,b:number, ) {
    const color = new Color();

    color.r = r;
    color.g = g;
    color.b = b;
    
    return color;
  }

  hex() {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
  }
}