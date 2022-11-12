import { ShipTemplates } from "./interfaces";

const shipTemplates: ShipTemplates = {
    Carrier: {
        name: "Carrier",
        health: 5,
        isPlaced: false,
        active: true,
        location: null,
    },
    Battleship: {
        name: "Battleship",
        health: 4,
        isPlaced: false,
        active: true,
        location: null,
    },
    Cruiser: {
        name: "Cruiser",
        health: 3,
        isPlaced: false,
        active: true,
        location: null,
    },
    Submarine: {
        name: "Submarine",
        health: 3,
        isPlaced: false,
        active: true,
        location: null,
    },
    Destroyer: {
        name: "Destroyer",
        health: 2,
        isPlaced: false,
        active: true,
        location: null,
    },
};

export { shipTemplates };
