import { ShipTemplates } from "./interfaces";

const shipTemplates: ShipTemplates = {
    Carrier: {
        name: "Carrier",
        health: 5,
        isPlaced: false,
        active: true,
        location: [],
        destroyedLocations: [],
    },
    Battleship: {
        name: "Battleship",
        health: 4,
        isPlaced: false,
        active: true,
        location: [],
        destroyedLocations: [],
    },
    Cruiser: {
        name: "Cruiser",
        health: 3,
        isPlaced: false,
        active: true,
        location: [],
        destroyedLocations: [],
    },
    Submarine: {
        name: "Submarine",
        health: 3,
        isPlaced: false,
        active: true,
        location: [],
        destroyedLocations: [],
    },
    Destroyer: {
        name: "Destroyer",
        health: 2,
        isPlaced: false,
        active: true,
        location: [],
        destroyedLocations: [],
    },
};

export { shipTemplates };
