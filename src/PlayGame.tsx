import React, { useEffect, useState } from "react";

import { generateCoordinates } from "./generateCoordinates";
import { getFleetLocation, getRandomCoordinates } from "./utils";

import Board from "./Board";

import { CoordinateType, Fleet } from "./types";
import { ShipInterface } from "./interfaces";

import "./playgame.scss";
import { e } from "vitest/dist/index-2f5b6168";

export default function PlayGame(props: {
    fleet: Fleet;
    opponentFleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setOpponentFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setupComplete: boolean | null;
}) {
    const { fleet, opponentFleet, setFleet, setOpponentFleet, setupComplete } = props;
    const [coordinates, setCoordinates] = useState<CoordinateType[]>(generateCoordinates());
    const [opponentCoordinates, setOpponentCoordinates] = useState<CoordinateType[]>(
        generateCoordinates()
    );
    const [winner, setWinner] = useState<string | null>(null);
    const [opponentTurn, setOpponentTurn] = useState<boolean>(false);
    const [targetHistory, setTargetHistory] = useState<string[]>([]);

    function targetRandomCoordinates() {
        const target = getRandomCoordinates();
        const coordinatesAlreadyTargeted = coordinates.some((coordinate) => {
            if (coordinate.location === target && coordinate.targeted) {
                return true;
            }
        });
        if (coordinatesAlreadyTargeted) {
            targetRandomCoordinates();
        } else {
            setCoordinates((prevCoordinates) => {
                return prevCoordinates.map((coordinate) => {
                    return coordinate.location === target
                        ? { ...coordinate, targeted: true }
                        : coordinate;
                });
            });
            setFleet((prevFleet) => {
                return prevFleet.map((ship) => {
                    if (ship.location.includes(target) && ship.health === 1) {
                        return {
                            ...ship,
                            health: ship.health - 1,
                            active: false,
                        };
                    } else if (ship.location.includes(target) && ship.health > 1) {
                        return {
                            ...ship,
                            health: ship.health - 1,
                        };
                    } else {
                        return ship;
                    }
                });
            });
            setOpponentTurn(false);
            return target;
        }
    }

    function target(id: string) {
        const coordinatesAlreadyTargeted = targetHistory.includes(id);
        if (coordinatesAlreadyTargeted) {
            return;
        } else {
            setOpponentCoordinates((prevCoordinates) => {
                return prevCoordinates.map((coordinate) => {
                    if (coordinate.location === id) {
                        return {
                            ...coordinate,
                            targeted: true,
                        };
                    } else {
                        return coordinate;
                    }
                });
            });
            setTargetHistory((prevTargetHistory) => {
                return [...prevTargetHistory, id];
            });
            setOpponentFleet((prevFleet) => {
                return prevFleet.map((ship) => {
                    if (ship.location.includes(id) && ship.health === 1) {
                        return {
                            ...ship,
                            health: ship.health - 1,
                            active: false,
                        };
                    } else if (ship.location.includes(id) && ship.health > 1) {
                        return {
                            ...ship,
                            health: ship.health - 1,
                        };
                    } else {
                        return ship;
                    }
                });
            });
            setOpponentTurn(true);
        }
    }

    useEffect(() => {
        if (!setupComplete) {
            return;
        }
        const fleetDestroyed = fleet.every((ship) => (ship.active ? false : true));
        if (fleetDestroyed) {
            setWinner("Computer");
        }
    }, [fleet]);

    useEffect(() => {
        if (!setupComplete) {
            return;
        }
        const fleetDestroyed = opponentFleet.every((ship) => (!ship.active ? true : false));
        if (fleetDestroyed) {
            setWinner("Player");
        } else if (opponentTurn) {
            targetRandomCoordinates();
        }
    }, [opponentCoordinates]);

    return (
        <div className="play-game">
            {<h1 className={`playgame-title ${winner ? "unhide" : ""}`}>{`${winner} wins!`}</h1>}
            <div className="game-area">
                <div className="">
                    <h2 className="fleet-label">Your Fleet</h2>
                    <Board
                        setup={false}
                        fleet={fleet}
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        isPlayerBoard={true}
                        target={target}
                    />
                </div>
                <div className="">
                    <h2 className="fleet-label">Enemy Fleet</h2>
                    <Board
                        setup={false}
                        fleet={opponentFleet}
                        coordinates={opponentCoordinates}
                        setCoordinates={setOpponentCoordinates}
                        isPlayerBoard={false}
                        target={target}
                        winner={winner}
                    />
                </div>
            </div>
        </div>
    );
}
