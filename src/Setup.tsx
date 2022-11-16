import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Board from "./Board";
import ShipSelectButton from "./ShipSelectButton";

import { generateCoordinates } from "./generateCoordinates";

import {
    getShipLocation,
    getRandomAxis,
    getRandomCoordinates,
    checkIsValidPlacement,
} from "./utils";

import { shipTemplates } from "./shipTemplates";
import { Axis, CoordinateType, Fleet, PlaceShip, ShipNames } from "./types";
import { ShipInterface, ShipTemplates } from "./interfaces";

import LocationContext from "./LocationContext";

import "./setup.scss";

const Setup = (props: {
    fleet: ShipInterface[];
    opponentFleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setOpponentFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setupComplete: boolean | null;
    setSetupComplete: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
    const { fleet, setFleet, opponentFleet, setOpponentFleet, setupComplete, setSetupComplete } =
        props;
    const [selectedShip, setSelectedShip] = useState<ShipInterface | null>(null);
    const [opponentSelectedShip, setOpponentSelectedShip] = useState<ShipInterface | null>(null);
    const [currentAxis, setCurrentAxis] = useState<"X" | "Y" | undefined>("X");
    const [highlightedCoordinates, setHighlightedCoordinates] = useState<string[]>([]);
    const [coordinates, setCoordinates] = useState<CoordinateType[]>(generateCoordinates());

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

    useEffect(() => {
        if (fleet.length === 5) {
            setSetupComplete(true);
        }
    }, [fleet]);

    return (
        <div className="page">
            <LocationContext.Provider
                value={{
                    placeShip: placeShip,
                    placeOpponentShip: placeOpponentShip,
                    opponentFleet,
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
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
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
            {setupComplete && (
                <div className="button" onClick={() => console.log("game has begun")}>
                    <Link
                        to="/playgame"
                        style={{ display: "inline-block", height: "100%", width: "100%" }}
                    >
                        Play
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Setup;
