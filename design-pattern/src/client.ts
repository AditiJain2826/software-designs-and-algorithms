import { IShipment, Shipment } from "./shipment";

export class Client {
    shipmentObj: IShipment;

    constructor(shipment: IShipment) {
        this.shipmentObj = shipment;
    }

    shipItem(): void {
        const shipmentStr = this.shipmentObj.ship();
        console.log(shipmentStr)
    }
}

