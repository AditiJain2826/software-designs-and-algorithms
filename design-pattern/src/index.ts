import { Client } from "./client";
import { Shipment } from "./shipment";
import { DoNotLeaveDecorator, FragileDecorator, ReturnReceiptRequestedDecorator } from "./shipment-decorator";

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
const fragileItem = new FragileDecorator(shipmentItem)
const donotleaveItem = new DoNotLeaveDecorator(fragileItem)
const returnReceiptRequested = new ReturnReceiptRequestedDecorator(donotleaveItem)
const client = new Client(returnReceiptRequested);
client.shipItem();