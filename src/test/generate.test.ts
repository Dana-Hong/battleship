import { expect, it } from "vitest";
import { generateCoordinates } from "../generateCoordinates";

it("generates an array of coordinate objects {location: (A-Z)(1-10), targeted: null, occupied: null, hovered: null}", () => {
    const coordinates = generateCoordinates();
    const exampleCoordinate = {
        location: "J10",
        targeted: null,
        occupied: null,
        hovered: null,
    };
    expect(coordinates[99]).toEqual(exampleCoordinate);
    expect(coordinates).toEqual(
        expect.arrayContaining([
            {
                location: "A4",
                targeted: null,
                occupied: null,
                hovered: null,
            },
        ])
    );
});
