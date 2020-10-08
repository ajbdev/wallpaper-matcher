export class Color {
  r: number | undefined;
  b: number | undefined;
  g: number | undefined;

  constructor() {}

  static rgb(r:number, b:number, g:number) {
    const color = new Color();

    color.r = r;
    color.b = b;
    color.g = g;
    
    return color;
  }
}