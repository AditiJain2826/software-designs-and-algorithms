export interface Shipper {
    getCost(weight: number): number;
}

export class AirEastLetterShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.39;
    }
}

export class ChicagoSprintLetterShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.42;
    }
}

export class PacificParcelLetterShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.51;
    }
}

export class AirEastPackageShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.25;
    }
}

export class ChicagoSprintPackageShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.20;
    }
}

export class PacificParcelPackageShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.19;
    }
}

export class AirEastOversizeShipper implements Shipper {
    getCost(weight: number): number {
        return 10 + weight * 0.25;
    }
}

export class ChicagoSprintOversizeShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.20;
    }
}

export class PacificParcelOversizeShipper implements Shipper {
    getCost(weight: number): number {
        return weight * 0.19 + 0.02;
    }
}
