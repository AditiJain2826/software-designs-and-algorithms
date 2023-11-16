import { IShipment } from "./shipment";

export class FragileDecorator implements IShipment {
    protected wrappee: IShipment;

    constructor(shipment: IShipment){
        this.wrappee = shipment;
    }
    ship(): string {
        this.wrappee.ship()
        return `${this.wrappee.ship()} \n**MARK FRAGILE**`;
    }
}

export class DoNotLeaveDecorator implements IShipment {
    protected wrappee: IShipment;

    constructor(shipment: IShipment){
        this.wrappee = shipment;
    }
    ship(): string {
        this.wrappee.ship()
        return `${this.wrappee.ship()} \n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
    }
}

export class ReturnReceiptRequestedDecorator implements IShipment {
    protected wrappee: IShipment;

    constructor(shipment: IShipment){
        this.wrappee = shipment;
    }
    ship(): string {
        this.wrappee.ship()
        return `${this.wrappee.ship()} \n**MARK RETURN RECEIPT REQUESTED**`;
    }
}