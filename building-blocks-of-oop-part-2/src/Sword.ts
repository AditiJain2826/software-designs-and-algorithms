import { Weapon } from "./Weapon";

export class Sword extends Weapon {

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super("sword", baseDamage, baseDurability, value, weight);
    }

    polish(): void {
        const max = this.baseDamage * 25 / 100;
        if ((this.damageModifier + Weapon.MODIFIER_CHANGE_RATE) > max) return;
        this.damageModifier = this.damageModifier ? this.damageModifier + Weapon.MODIFIER_CHANGE_RATE : Weapon.MODIFIER_CHANGE_RATE;
    }
}