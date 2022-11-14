import { longitudeCoordinates, latitudeCoordinates } from "./generateCoordinates";
import { ShipInterface } from "./interfaces";
import { Axis, Fleet } from "./types";

export function getShipLocation(id: string, shipHealth: number, axis: "X" | "Y" | undefined) {
    const shipLength = shipHealth;
    const longitudeCoordinate = Number(id.slice(1));
    const latitudeCoordinate = id[0];
    const longCoordinatesCopy = [...longitudeCoordinates];
    const latCoordinatesCopy = [...latitudeCoordinates];
    let hoveredCoordinates: string[] = [];

    if (axis === "X") {
        const sliceStartIndex = latCoordinatesCopy.indexOf(latitudeCoordinate);
        const hoveredlatCoordinates = latCoordinatesCopy.splice(sliceStartIndex, shipLength);
        hoveredCoordinates = hoveredlatCoordinates.map(
            (coordinate) => `${coordinate}${longitudeCoordinate}`
        );
    } else if (axis === "Y") {
        const sliceStartIndex = longCoordinatesCopy.indexOf(String(longitudeCoordinate));
        const hoveredLongCoordinates = longCoordinatesCopy.splice(sliceStartIndex, shipLength);
        hoveredCoordinates = hoveredLongCoordinates.map(
            (coordinate) => `${latitudeCoordinate}${coordinate}`
        );
    }
    return hoveredCoordinates;
}

export function getRandomIndex() {
    return Math.floor(Math.random() * 10);
}

export function getRandomCoordinates() {
    return `${latitudeCoordinates[getRandomIndex()]}${longitudeCoordinates[getRandomIndex()]}`;
}

export function getRandomAxis() {
    return Math.random() > 0.5 ? "X" : "Y";
}

export function getFleetLocation(fleet: Fleet) {
    return fleet
        .map((ship) => {
            return ship.location;
        })
        .flat();
}

export function checkIsValidPlacement(
    selectedShip: ShipInterface,
    fleet: Fleet,
    id: string,
    axis: Axis
) {
    if (selectedShip === null) {
        return false;
    }
    const shipLocation = getShipLocation(id, selectedShip.health, axis);
    const fleetLocation = getFleetLocation(fleet);
    const placementConflict = fleetLocation.some((coordinate) => {
        return shipLocation.includes(coordinate);
    });
    if (placementConflict || shipLocation.length !== selectedShip.health) {
        return false;
    }
    return true;
}
