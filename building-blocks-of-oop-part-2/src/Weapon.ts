import { Item } from "./Item";

export class Weapon extends Item {
    protected baseDamage: number;
    protected damageModifier: number;
    private baseDurability: number;
    protected durabilityModifier: number;
    static MODIFIER_CHANGE_RATE: number = 0.05;

    constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(name, value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }
    getEffectiveDamage() :number{
        return this.damageModifier ? this.baseDamage + this.damageModifier : this.baseDamage;
    }
    getEffectiveDurability(): number
    getEffectiveDurability(durabilityModifier: number): number
    getEffectiveDurability(durabilityModifier?: number): number {
        const dur = this.durabilityModifier ? this.durabilityModifier : 0;
        return durabilityModifier ? this.baseDurability + durabilityModifier : this.baseDurability + dur;
    }
    toString(): string {
        const durability = this.getEffectiveDurability() * 100;
        const damage = this.getEffectiveDamage();
        return `${this.name} − Value: ${this.value.toPrecision(3)}, Weight: ${this.weight.toPrecision(3)}, Damage: ${damage.toFixed(2)}, Durability: ${durability.toFixed(2)}%`
    }
    use(): string {
        if (this.baseDurability <= 0) return `You can't use the ${this.name}, it is broken.`
        this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE;
        if (this.baseDurability <= 0) return `You use the ${this.name}, dealing 0.05 points of damage.\nThe ${this.name} breaks.`
        return `You use the ${this.name}, dealing 0.05 points of damage.`
    }
}