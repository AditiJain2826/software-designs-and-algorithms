import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    numberOfSlices: number;
    numberOfEatenSlices: number;
    constructor(value: number, weight: number, isSpoiled: boolean, numberOfSlices: number) {
        super('Pizza', value, weight, isSpoiled)
        this.numberOfSlices = numberOfSlices;
        this.numberOfEatenSlices = 0;
    }
    getNumberOfEatenSlices(): number {
        return this.numberOfEatenSlices;
    }
    use(): string {
        if (this.numberOfEatenSlices === this.numberOfSlices) return "There's nothing left of the pizza to consume."
        this.numberOfEatenSlices++;
        return `You consumed a slice of the pizza.`
    }
}