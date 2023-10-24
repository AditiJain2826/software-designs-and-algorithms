import { Item } from "./Item";

export class Consumable extends Item {
    public isConsumed: boolean;
    private isSpoiled: boolean;

    constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
        super(name, value, weight)
        this.isConsumed = false;
        this.isSpoiled = isSpoiled;
    }
    public getisSpoiled(): boolean {
        return this.isSpoiled;
    }
    use(): string {
        if (this.isConsumed) return `There's nothing left of the ${this.name} to consume.`
        if (this.isSpoiled) return `You consumed the ${this.name}.\nYou feel sick.`
        return `You consumed the ${this.name}.`
    }
}