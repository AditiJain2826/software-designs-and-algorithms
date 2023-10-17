import { Point } from "./point";
import { Shape } from "./Shape";

export class Triangle extends Shape {

    constructor(v1: Point, v2: Point, v3: Point);
    constructor(v1: Point, v2: Point, v3: Point, color: string, filled: boolean);
    constructor(v1: Point, v2: Point, v3: Point, color?: string, filled?: boolean) {
        super([v1, v2, v3], color, filled);
    }

    toString(): string {
        return `Triangle[v1=${this.points[0].toString()},v2=${this.points[1].toString()},v3=${this.points[2].toString()}]`
    }

    getType(): string {
        const side1 = this.points[0].distance(this.points[1]);
        const side2 = Math.abs(this.points[1].distance(this.points[2]));
        const side3 = this.points[2].distance(this.points[0]);
        const epsilon = 0.001;
        if ((Math.abs(side1 - side2) < epsilon && Math.abs(side2 - side3) < epsilon)) {
            return 'equilateral triangle';
        } else if (Math.abs(side1 - side2) < epsilon ||
            Math.abs(side2 - side3) < epsilon ||
            Math.abs(side3 - side1) < epsilon) {
            return 'isosceles triangle';
        } else {
            return 'scalene triangle';
        }
    }

}