import React, { useState } from "react";
import { Link } from "react-router-dom";

import Board from "./Board";
import ShipSelectButton from "./ShipSelectButton";

import { latitudeCoordinates, longitudeCoordinates } from "./generateCoordinates";

import { shipTemplates } from "./shipTemplates";
import { Fleet, ShipNames } from "./types";
import { ShipInterface, ShipTemplates } from "./interfaces";

import LocationContext from "./LocationContext";

import "./setup.scss";

const Setup = (props: {
    fleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
}) => {
    const { fleet, setFleet } = props;
    const [selectedShip, setSelectedShip] = useState<ShipInterface | null>(null);
    const [currentAxis, setCurrentAxis] = useState<"X" | "Y" | undefined>("X");
    const [highlightedCoordinates, setHighlightedCoordinates] = useState<string[]>([]);

    function highlightCoordinates(id: string, shipLength: number, axis: "X" | "Y" | undefined) {
        const longitudeCoordinate = Number(id.slice(1));
        const latitudeCoordinate = id[0];
        const longCoordinatesCopy = [...longitudeCoordinates];
        const latCoordinatesCopy = [...latitudeCoordinates];
        let hoveredCoordinates: string[] = [];

        if (axis === "X") {
            const sliceStartIndex = longCoordinatesCopy.indexOf(String(longitudeCoordinate));
            const hoveredlatCoordinates = longCoordinatesCopy.splice(sliceStartIndex, shipLength);
            hoveredCoordinates = hoveredlatCoordinates.map(
                (coordinate) => `${latitudeCoordinate}${coordinate}`
            );
        } else if (axis === "Y") {
            const sliceStartIndex = latitudeCoordinates.indexOf(latitudeCoordinate);
            const hoveredLongCoordinates = latCoordinatesCopy.splice(sliceStartIndex, shipLength);
            hoveredCoordinates = hoveredLongCoordinates.map(
                (coordinate) => `${coordinate}${longitudeCoordinate}`
            );
        }
        setHighlightedCoordinates(hoveredCoordinates);
    }

    function switchAxis() {
        setCurrentAxis((prevAxis) => (prevAxis === "X" ? "Y" : "X"));
    }

    function placeShip(selectedShip: ShipInterface, fleet: Fleet) {
        const fleetLocation = fleet
            .map((ship) => {
                return ship.location;
            })
            .flat();

        console.log(fleetLocation);

        if (selectedShip.name !== undefined) {
            const placedShip = {
                ...selectedShip,
                isPlaced: true,
                location: highlightedCoordinates,
            };
            setFleet((prevFleet: ShipInterface[]): ShipInterface[] => {
                const updatedFleet: ShipInterface[] = [...prevFleet, placedShip];
                return updatedFleet;
            });

            setSelectedShip(null);
        }
    }

    function selectShip(shipName: ShipNames) {
        type ShipKey = keyof typeof shipTemplates;
        let ship: ShipKey = shipName;
        let shipAlreadyPlaced;

        fleet.forEach((ship: ShipInterface) => {
            if (ship.name === shipName) shipAlreadyPlaced = ship.isPlaced;
        });

        if (shipName === null || shipAlreadyPlaced) {
            return;
        }
        setSelectedShip(shipTemplates[ship]);
    }

    return (
        <div className="page">
            <LocationContext.Provider
                value={{
                    placeShip: placeShip,
                    selectedShip: selectedShip,
                }}
            >
                <Board
                    setup={true}
                    selectedShip={selectedShip!}
                    highlightedCoordinates={highlightedCoordinates}
                    highlightCoordinates={highlightCoordinates}
                    axis={currentAxis}
                    fleet={fleet}
                />
            </LocationContext.Provider>
            <div className="ship-container">
                <ShipSelectButton shipName="Carrier" selectShip={selectShip} />

                <ShipSelectButton shipName="Battleship" selectShip={selectShip} />

                <ShipSelectButton shipName="Cruiser" selectShip={selectShip} />

                <ShipSelectButton shipName="Submarine" selectShip={selectShip} />

                <ShipSelectButton shipName="Destroyer" selectShip={selectShip} />
            </div>
            <button onClick={switchAxis}>{`Switch to ${
                currentAxis === "Y" ? "X" : "Y"
            } axis`}</button>
            <Link to="/playgame">
                <button>Play</button>
            </Link>
        </div>
    );
};

export default Setup;
