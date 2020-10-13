export declare class Color {
    r: number;
    b: number;
    g: number;
    private constructor();
    static rgb(r: number, g: number, b: number): Color;
    hex(): string;
}
