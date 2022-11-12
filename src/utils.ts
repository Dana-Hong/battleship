import { longitudeCoordinates, latitudeCoordinates } from "./generateCoordinates";
import { Fleet } from "./types";

// function getCurrentHoveredCoordinates(
//     coordinatesArray: string[],
//     startingCoordinate: string | number,
//     shipLength: number
// ) {
//     const sliceStartIndex = coordinatesArray.indexOf(String(startingCoordinate));
//     const hoveredCoordinates = coordinatesArray.splice(sliceStartIndex, shipLength);
//     console.log(hoveredCoordinates);
//     return hoveredCoordinates.map((hoveredCoordinate) => {
//         if (coordinatesArray[0] === "A") {
//             return `${hoveredCoordinate}${startingCoordinate}`;
//         } else {
//             return `${startingCoordinate}${hoveredCoordinate}`;
//         }
//     });
// }

export function getShipLocation(id: string, shipHealth: number, axis: "X" | "Y" | undefined) {
    const shipLength = shipHealth;
    const longitudeCoordinate = Number(id.slice(1));
    const latitudeCoordinate = id[0];
    const longCoordinatesCopy = [...longitudeCoordinates];
    const latCoordinatesCopy = [...latitudeCoordinates];
    let hoveredCoordinates: string[] = [];

    // if (axis === "X") {
    //     hoveredCoordinates = getCurrentHoveredCoordinates(
    //         latCoordinatesCopy,
    //         longitudeCoordinate,
    //         shipLength
    //     );
    // } else {
    //     hoveredCoordinates = getCurrentHoveredCoordinates(
    //         longCoordinatesCopy,
    //         latitudeCoordinate,
    //         shipLength
    //     );
    // }

    if (axis === "X") {
        const sliceStartIndex = latCoordinatesCopy.indexOf(latitudeCoordinate);
        const hoveredlatCoordinates = latCoordinatesCopy.splice(sliceStartIndex, shipLength);
        console.log("hoveredlatcoords:", hoveredlatCoordinates);
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
    console.log(hoveredCoordinates);

    return hoveredCoordinates;
}

export function getFleetLocation(fleet: Fleet) {
    return fleet
        .map((ship) => {
            return ship.location;
        })
        .flat();
}
