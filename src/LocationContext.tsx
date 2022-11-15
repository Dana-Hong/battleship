import { createContext } from "react";
import { Axis, Fleet, PlaceOpponentShip, PlaceShip } from "./types";
import { ShipInterface } from "./interfaces";

const defaultContext: {
    placeShip: PlaceShip;
    placeOpponentShip: PlaceOpponentShip;
    opponentFleet: Fleet | null;
    selectedShip: ShipInterface | null | undefined;
} = {
    placeShip: (selectedShip: ShipInterface, fleet: Fleet, id: string, axis: Axis) => {},
    placeOpponentShip: (selectedShip: ShipInterface, fleet: Fleet) => {
        return "placed";
    },
    opponentFleet: null,
    selectedShip: null,
};

const LocationContext = createContext(defaultContext);

export default LocationContext;
