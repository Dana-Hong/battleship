import { useEffect, useState } from "react";

import { generateCoordinates } from "./generateCoordinates";
import { getRandomCoordinates } from "./utils";

import Board from "./Board";

import { CoordinateType, Fleet } from "./types";
import { ShipInterface } from "./interfaces";
import { shipTemplates } from "./shipTemplates";

export default function PlayGame(props: {
    fleet: Fleet;
    opponentFleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setOpponentFleet: React.Dispatch<React.SetStateAction<Fleet>>;
}) {
    const { fleet, opponentFleet, setFleet, setOpponentFleet } = props;

    const [coordinates, setCoordinates] = useState<CoordinateType[]>(generateCoordinates());
    const [opponentCoordinates, setOpponentCoordinates] = useState<CoordinateType[]>(
        generateCoordinates()
    );

    function target(id: string, fleet: Fleet) {
        const isOpponentFleet = fleet[0].location[0] === opponentFleet[0].location[0];
        if (isOpponentFleet) {
            const alreadyTargeted = opponentCoordinates.some((coordinate) => {
                if (coordinate.location === id && coordinate.targeted) {
                    return true;
                }
            });
            if (alreadyTargeted) return;
        } else {
            const alreadyTargeted = coordinates.some((coordinate) => {
                return coordinate.location === id ? true : false;
            });
            if (alreadyTargeted) {
                target(getRandomCoordinates(), opponentFleet);
            }
        }
        function setAsTargeted() {
            if (isOpponentFleet) {
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
            } else {
                setCoordinates((prevCoordinates) => {
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
            }
        }

        if (fleet.some((ship) => ship.location.includes(id))) {
            if (isOpponentFleet) {
                console.log("hit!");
                setOpponentFleet((prevOpponentFleet) => {
                    return prevOpponentFleet.map((ship) => {
                        if (ship.location.includes(id)) {
                            return {
                                ...ship,
                                destroyedLocations: [...ship.destroyedLocations, id],
                                health: ship.health - 1,
                            };
                        } else {
                            return ship;
                        }
                    });
                });
            } else {
                setFleet((prevFleet: ShipInterface[]): ShipInterface[] => {
                    return prevFleet.map((ship) => {
                        if (ship.location.includes(id)) {
                            return {
                                ...ship,
                                destroyedLocations: [...ship.destroyedLocations, id],
                                health: ship.health - 1,
                            };
                        } else {
                            return ship;
                        }
                    });
                });
            }
        }
        setAsTargeted();
    }

    useEffect(() => {
        const destroyedShips = fleet.filter((ship) => ship.health === 0);
        destroyedShips.length === 5 ? console.log("Computer wins") : "";
    }, [fleet]);

    useEffect(() => {
        const destroyedShips = opponentFleet.filter((ship) => ship.health === 0);
        destroyedShips.length === 5 ? console.log("player wins") : "";
    }, [opponentFleet]);

    return (
        <div>
            myboard
            <Board
                setup={false}
                fleet={fleet}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
            />
            <Board
                setup={false}
                fleet={opponentFleet}
                target={target}
                coordinates={opponentCoordinates}
                setCoordinates={setOpponentCoordinates}
            />
        </div>
    );
}
