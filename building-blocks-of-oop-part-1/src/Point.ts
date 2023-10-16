export class Point {
    x: number;
    y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }
    toString(): string {
        return `(${this.x}, ${this.y})`
    }
    distance(): number;
    distance(other: Point): number;
    distance(x: number, y: number): number;

    distance(x2?: number | Point, y2?: number): number {
        if (x2 instanceof Point) {
            const distanceX = this.x - x2.x;
            const distanceY = this.y - x2.y;
            return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        } else if (typeof x2 === 'number' && typeof y2 === 'number') {
            const distanceX = this.x - Math.abs(x2);
            const distanceY = this.y - Math.abs(y2);
            return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        } else {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
}