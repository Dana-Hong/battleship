import { useContext } from "react";
import LocationContext from "./LocationContext";
import { ShipInterface } from "./interfaces";
import { highlightCoordinates, CoordinateType, Fleet } from "./types";

import "./coordinate.scss";

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
    fleet: Fleet;
    isPlayerBoard: boolean | undefined;
    winner?: string | null;
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
        isPlayerBoard,
        winner,
    } = props;
    const { placeShip, placeOpponentShip, opponentFleet } = useContext(LocationContext);

    const fleetPosition = fleet
        .map((ship) => {
            return ship.location;
        })
        .flat();

    const shipHere = fleetPosition.includes(location);

    return (
        <div
            className={`coordinate ${shipHere && isPlayerBoard ? "occupied" : ""} ${
                hovered ? hovered : ""
            } ${isPlayerBoard || setup === false ? "" : "enemyboard"} ${
                occupied && targeted ? "destroyed" : ""
            }`}
            id={location}
            onClick={(event) => {
                if (setup) {
                    placeShip(selectedShip as ShipInterface, fleet, location, axis);
                    placeOpponentShip(selectedShip as ShipInterface, opponentFleet as Fleet);
                    return;
                } else if (!isPlayerBoard && !winner) {
                    target!((event.target as HTMLDivElement).id);
                    return;
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
        >
            {targeted && <span className="targeted"></span>}
        </div>
    );
}
