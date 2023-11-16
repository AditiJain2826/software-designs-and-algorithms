import { Client } from "./client";
import { Shipment } from "./shipment";

const data = {
    shipmentID: 0,
    weight: 20,
    fromAddress: "xyz",
    fromZipCode: "42345",
    toAddress: "abc",
    toZipCode: "12344",
};

const shipmentItem = Shipment.getInstance(
    data.weight,
    data.fromAddress,
    data.fromZipCode,
    data.toAddress,
    data.toZipCode
);

const client = new Client(shipmentItem);
client.shipItem();