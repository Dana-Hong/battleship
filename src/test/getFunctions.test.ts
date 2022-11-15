import { expect, it } from "vitest";
import * as utils from "../utils";

const testFleet = [
    {
        name: "Carrier",
        health: 5,
        isPlaced: true,
        active: true,
        location: ["A4", "A5", "A6", "A7", "A8"],
        destroyedLocations: [],
    },
    {
        name: "Battleship",
        health: 4,
        isPlaced: true,
        active: true,
        location: ["C3", "D3", "D4", "D5"],
        destroyedLocations: [],
    },
];

const testSelectedShip = testFleet[0];

// getRandomIndex()
it("gets a random number from 0-9", () => {
    const randomIndex = utils.getRandomIndex();
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThanOrEqual(9);
});

// getRandomAxis()
it("returns either X or Y", () => {
    const randomAxis = utils.getRandomAxis();
    expect(["X", "Y"]).toContain(randomAxis);
});

// getRandomCoordinates()
it("returns random valid coordinates", () => {
    const coordinate = utils.getRandomCoordinates();
    const regEx = expect.stringMatching(/[A-Z]([1-9]|10)$/);
    expect(coordinate).toEqual(regEx);
});

// getShipLocation()
it("returns the coordinates of the ship using the selected coordinate and current axis as arguments", () => {
    const shipLocation = utils.getShipLocation("A10", 4, "X");
    const invalidLocation = utils.getShipLocation("A10", 4, "Y");
    expect(shipLocation).toStrictEqual(["A10", "B10", "C10", "D10"]);
    expect(invalidLocation).toStrictEqual(["A10"]);
});

// getFleetLocation
it("returns an array of coordinates of all ships in fleet", () => {
    const fleetLocation = utils.getFleetLocation(testFleet);
    expect(fleetLocation).toStrictEqual(["A4", "A5", "A6", "A7", "A8", "C3", "D3", "D4", "D5"]);
});

// checkIsValidPlacement()
it("returns true if placement is valid", () => {
    const failPlacement = utils.checkIsValidPlacement(testSelectedShip, testFleet, "A5", "Y");
    const passPlacement = utils.checkIsValidPlacement(testSelectedShip, testFleet, "A10", "X");
    expect(failPlacement).toEqual(false);
    expect(passPlacement).toEqual(true);
});
