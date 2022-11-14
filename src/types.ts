import { ShipInterface } from "./interfaces";

export type Fleet = [] | ShipInterface[];

export type ShipNames = "Carrier" | "Battleship" | "Cruiser" | "Submarine" | "Destroyer";

export type PlaceShip = (
    selectedShip: ShipInterface,
    fleet: Fleet,
    id: string,
    axis: Axis
) => void | null;

export type PlaceOpponentShip = (selectedShip: ShipInterface, fleet: Fleet) => "placed";

export type selectShip = (shipName: ShipNames) => ShipInterface;

export type Axis = "X" | "Y" | undefined;

export type highlightCoordinates = (
    id: string,
    shipLength: number,
    axis: "X" | "Y" | undefined
) => void;

export type CoordinateType = {
    location: string;
    targeted: null | boolean;
    occupied: null | boolean;
    hovered: null | string;
    highlightedCoordinates?: string[];
    selectedShip?: ShipInterface;
    axis?: "X" | "Y" | undefined;
};
