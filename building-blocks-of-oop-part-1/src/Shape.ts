import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled: boolean = true) {
    if (points.length < 3) throw new Error("A shape should have at least 3 points.")
    this.points = points
    this.color = color || "green";
    this.filled = filled;
  }

  toString(): string {
    const filledStr = this.filled === true ? "filled" : "not filled";
    const pointArr = this.points.map(point => point.toString());
    const pointStr = pointArr.join(', ');
    return `A Shape with color of ${this.color} and ${filledStr}. Points: ${pointStr}.`
  }

  getPerimeter() {
    let perimeter = 0;
    for (let i = 0; i < this.points.length; i++) {
      perimeter += this.points[i].distance(this.points[i + 1]);
    }
    return perimeter;
  }

  abstract getType(): string;
}
