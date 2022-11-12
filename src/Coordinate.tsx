import { useContext } from "react";
import LocationContext from "./LocationContext";
import { ShipInterface } from "./interfaces";
import { highlightCoordinates, CoordinateType } from "./types";

import "./coordinate.scss";
import { shipTemplates } from "./shipTemplates";
import Setup from "./Setup";

export default function Coordinate(props: {
    setup: boolean;
    location: string;
    targeted: null | boolean;
    occupied: null | boolean;
    hovered?: null | string;
    highlightCoordinates?: highlightCoordinates;
    selectedShip?: ShipInterface;
    axis?: "X" | "Y" | undefined;
    target?: (id: string) => void;
    fleet: ShipInterface[];
}) {
    const {
        setup,
        location,
        targeted,
        occupied,
        hovered,
        highlightCoordinates,
        selectedShip,
        axis,
        target,
        fleet,
    } = props;
    const { placeShip } = useContext(LocationContext);

    const fleetPosition = fleet
        .map((ship) => {
            return ship.location;
        })
        .flat();

    const shipHere = fleetPosition.includes(location);

    return (
        <div
            className={`coordinate ${shipHere ? "occupied" : ""} ${hovered ? hovered : ""}`}
            id={location}
            // onClick={(event) =>
            //     locationContext.placeShip(
            //         locationContext.selectedShip,
            //         event.target.id
            //     )
            // }
            onClick={(event) => {
                if (setup) {
                    placeShip(selectedShip as ShipInterface, fleet);
                } else {
                    target!((event.target as HTMLDivElement).id);
                }
            }}
            onMouseOver={(event) => {
                if (setup && selectedShip !== null) {
                    highlightCoordinates!(
                        (event.target as HTMLDivElement).id,
                        selectedShip!.health,
                        axis
                    );
                }
            }}
        ></div>
    );
}
