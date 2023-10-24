import { Comparable } from "./Comparable";

export class Item {
    static idCounter: number = 1;
    private id: number;
    public name: string;
    public value: number;
    public weight: number;

    constructor(name: string, value: number, weight: number) {
        this.id = Item.idCounter;
        Item.idCounter++;
        this.name = name;
        this.value = value;
        this.weight = weight;
    }

    static resetIdCounter() {
        Item.idCounter = 1;
    }

    toString() {
        return `${this.name} − Value: ${this.value.toPrecision(3)}, Weight: ${this.weight.toPrecision(3)}`
    }

    compareTo(other: Item) {
        if (this.value > other.value) {
            return 1;
        } else if (this.value < other.value) {
            return -1;
        } else {
            return compareStrings(this.name, other.name)
        }
    }
    getId(): number {
        return this.id;
    }

}

function compareStrings(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
        if (str1[i] < str2[i]) {
            return -1;
        } else if (str1[i] > str2[i]) {
            return 1;
        }
    }

    if (str1.length < str2.length) {
        return -1;
    } else if (str1.length > str2.length) {
        return 1;
    }

    return 0;
}