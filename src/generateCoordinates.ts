import { CoordinateType } from "./types";

const longitudeCoordinates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const latitudeCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const generateCoordinates = (): CoordinateType[] => {
    const coordinatesArray = latitudeCoordinates.map((latitudeCoordinates) => {
        return longitudeCoordinates.map((longitudeCoordinates) => {
            return {
                location: `${latitudeCoordinates}${longitudeCoordinates}`,
                targeted: null,
                occupied: null,
                hovered: null,
            };
        });
    });

    return coordinatesArray.flat();
};

export { longitudeCoordinates, latitudeCoordinates, generateCoordinates };
