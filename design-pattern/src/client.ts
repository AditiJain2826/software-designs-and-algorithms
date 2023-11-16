import { Shipment } from "./shipment";

export class Client {
    shipmentObj: Shipment;

    constructor(shipment: Shipment) {
        this.shipmentObj = shipment;
    }

    shipItem(): void {
        const shipmentStr = this.shipmentObj.ship();
        console.log(shipmentStr)
    }
}

