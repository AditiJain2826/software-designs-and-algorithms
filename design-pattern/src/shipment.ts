import { Shipper } from "./shipper";
import { AirEastShipperFactory, ChicagoSprintShipperFactory, PacificParcelShipperFactory, ShipperFactory } from "./shipper-factory";


export interface IShipment{
    ship():string;
}
export class Shipment implements IShipment {

    private shipmentID: number;
    private weight: number;
    private fromAddress: string;
    private fromZipcode: string;
    private toAddress: string;
    private toZipcode: string;
    static id: number = 0;
    private shipperFactory: ShipperFactory;
    private shipper: Shipper;

    private constructor(weight: number, fromAddress: string, fromZipcode: string, toAddress: string, toZipcode: string, shipperFactory: ShipperFactory, shipper: Shipper) {
        this.shipmentID = this.getShipmentID();
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.fromZipcode = fromZipcode;
        this.toZipcode = toZipcode;
        this.shipperFactory = shipperFactory;
        this.shipper = shipper;
    }

    static getInstance(weight: number, fromAddress: string, fromZipcode: string, toAddress: string, toZipcode: string) {
        const shipperFactory = Shipment.getShipperFactory(fromZipcode);
        const shipper = Shipment.getShipper(weight, shipperFactory);
        return new Shipment(
            weight,
            fromAddress,
            fromZipcode,
            toAddress,
            toZipcode,
            shipperFactory,
            shipper
        );
    }
    private getShipmentID(): number {
        return Shipment.id++;
    }
    ship(): string {
        const cost = this.shipper.getCost(this.weight);
        return `Shipment with the ID: ${this.shipmentID} will be picked up from ${this.fromAddress}, and shipped to ${this.toAddress}, \nCost: ${cost}`
    }
    
    static getShipperFactory(zipcode: string) {
        const firstDigit = parseInt(zipcode[0]);
        if (firstDigit >= 1 && firstDigit <= 3) {
            return new AirEastShipperFactory();
        } else if (firstDigit >= 4 && firstDigit <= 6) {
            return new ChicagoSprintShipperFactory();
        } else {
            return new PacificParcelShipperFactory();
        }
    }

    static getShipper(weight: number, shipperFactory: ShipperFactory) {
        if (weight <= 15) {
            return shipperFactory.createLetterShipper();
        } else if (weight <= 160) {
            return shipperFactory.createPackageShipper();
        } else {
            return shipperFactory.createOversizeShipper();
        }
    }
}