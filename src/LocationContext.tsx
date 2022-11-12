import { createContext } from "react";
import { Fleet } from "./types";
import { ShipInterface } from "./interfaces";

const defaultContext: {
    placeShip: (selectedShip: ShipInterface, fleet: Fleet) => void;
    selectedShip: ShipInterface | null | undefined;
} = {
    placeShip: (selectedShip: ShipInterface, fleet: Fleet) => {},
    selectedShip: null,
};

const LocationContext = createContext(defaultContext);

export default LocationContext;
