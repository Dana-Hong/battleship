import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Board from "./Board";
import ShipSelectButton from "./ShipSelectButton";

import {
    getShipLocation,
    getRandomAxis,
    getRandomCoordinates,
    checkIsValidPlacement,
} from "./utils";

import { shipTemplates } from "./shipTemplates";
import { Axis, Fleet, PlaceShip, ShipNames } from "./types";
import { ShipInterface, ShipTemplates } from "./interfaces";

import LocationContext from "./LocationContext";

import "./setup.scss";

const Setup = (props: {
    fleet: ShipInterface[];
    opponentFleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setOpponentFleet: React.Dispatch<React.SetStateAction<Fleet>>;
}) => {
    const { fleet, setFleet, opponentFleet, setOpponentFleet } = props;
    const [selectedShip, setSelectedShip] = useState<ShipInterface | null>(null);
    const [opponentSelectedShip, setOpponentSelectedShip] = useState<ShipInterface | null>(null);
    const [currentAxis, setCurrentAxis] = useState<"X" | "Y" | undefined>("X");
    const [highlightedCoordinates, setHighlightedCoordinates] = useState<string[]>([]);

    function highlightCoordinates(id: string, shipLength: number, axis: "X" | "Y" | undefined) {
        const hoveredCoordinates = getShipLocation(id, shipLength, axis);
        setHighlightedCoordinates(hoveredCoordinates);
    }

    function switchAxis() {
        setCurrentAxis((prevAxis) => (prevAxis === "X" ? "Y" : "X"));
    }

    function placeShip(selectedShip: ShipInterface, fleet: Fleet, id: string, currentAxis: Axis) {
        const validPlacement = checkIsValidPlacement(selectedShip, fleet, id, currentAxis);

        if (validPlacement !== true) {
            return;
        }

        setFleet((prevFleet: ShipInterface[]): ShipInterface[] => {
            const updatedFleet: ShipInterface[] = [
                ...prevFleet,
                {
                    ...selectedShip,
                    isPlaced: true,
                    location: highlightedCoordinates,
                },
            ];
            return updatedFleet;
        });

        setSelectedShip(null);
        setOpponentSelectedShip(null);
    }

    function placeOpponentShip(selectedShip: ShipInterface, fleet: Fleet): "placed" {
        const id = getRandomCoordinates();
        const axis = getRandomAxis();
        const validPlacement = checkIsValidPlacement(selectedShip, fleet, id, axis);
        if (validPlacement) {
            setOpponentFleet((prevOpponentFleet: ShipInterface[]): ShipInterface[] => {
                const updatedFleet: ShipInterface[] = [
                    ...prevOpponentFleet,
                    {
                        ...selectedShip,
                        isPlaced: true,
                        location: getShipLocation(id, selectedShip.health, axis),
                    },
                ];
                return updatedFleet;
            });
        } else {
            return placeOpponentShip(selectedShip, fleet);
        }
        return "placed";
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
        setOpponentSelectedShip(shipTemplates[ship]);
    }

    console.log(fleet);

    return (
        <div className="page">
            <LocationContext.Provider
                value={{
                    placeShip: placeShip,
                    placeOpponentShip: placeOpponentShip,
                    opponentFleet,
                    selectedShip: selectedShip,
                    opponentSelectedShip,
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
                <button
                    onClick={() => {
                        placeOpponentShip(opponentSelectedShip as ShipInterface, opponentFleet);
                    }}
                >
                    PLACE SHIP
                </button>
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
