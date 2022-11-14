import Board from "./Board";

import { Fleet } from "./types";
import { ShipInterface } from "./interfaces";

export default function PlayGame(props: {
    fleet: Fleet;
    opponentFleet: ShipInterface[];
    setFleet: React.Dispatch<React.SetStateAction<Fleet>>;
    setOpponentFleet: React.Dispatch<React.SetStateAction<Fleet>>;
}) {
    const { fleet, setFleet } = props;

    function target(id: string) {
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
        console.log(fleet);
    }

    console.log("fleet:", fleet);
    return (
        <div>
            board
            <Board setup={false} fleet={fleet} target={target} />
        </div>
    );
}
