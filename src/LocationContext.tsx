import { createContext } from "react";
import { Fleet, PlaceShip } from "./types";
import { ShipInterface } from "./interfaces";

const defaultContext: {
    placeShip: PlaceShip;
    selectedShip: ShipInterface | null | undefined;
} = {
    placeShip: (selectedShip: ShipInterface, fleet: Fleet) => {},
    selectedShip: null,
};

const LocationContext = createContext(defaultContext);

export default LocationContext;
