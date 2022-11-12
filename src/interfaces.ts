import { Fleet } from "./types";

export interface ShipInterface {
    name: string;
    health: number;
    isPlaced: boolean;
    active: boolean;
    location: string[];
    destroyedLocations: string[];
}

export interface ShipTemplates {
    Carrier: ShipInterface;
    Battleship: ShipInterface;
    Cruiser: ShipInterface;
    Submarine: ShipInterface;
    Destroyer: ShipInterface;
}
