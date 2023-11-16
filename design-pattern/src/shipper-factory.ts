import { AirEastLetterShipper, AirEastOversizeShipper, AirEastPackageShipper, ChicagoSprintLetterShipper, ChicagoSprintOversizeShipper, ChicagoSprintPackageShipper, PacificParcelLetterShipper, PacificParcelOversizeShipper, PacificParcelPackageShipper, Shipper } from "./shipper";

export interface ShipperFactory {
    createLetterShipper(): Shipper;
    createPackageShipper(): Shipper;
    createOversizeShipper(): Shipper;
}

export class AirEastShipperFactory implements ShipperFactory {
    createLetterShipper(): Shipper {
        return new AirEastLetterShipper();
    }

    createPackageShipper(): Shipper {
        return new AirEastPackageShipper();
    }

    createOversizeShipper(): Shipper {
        return new AirEastOversizeShipper();
    }
}

export class ChicagoSprintShipperFactory implements ShipperFactory {
    createLetterShipper(): Shipper {
        return new ChicagoSprintLetterShipper();
    }

    createPackageShipper(): Shipper {
        return new ChicagoSprintPackageShipper();
    }

    createOversizeShipper(): Shipper {
        return new ChicagoSprintOversizeShipper();
    }
}

export class PacificParcelShipperFactory implements ShipperFactory {
    createLetterShipper(): Shipper {
        return new PacificParcelLetterShipper();
    }

    createPackageShipper(): Shipper {
        return new PacificParcelPackageShipper();
    }

    createOversizeShipper(): Shipper {
        return new PacificParcelOversizeShipper();
    }
}