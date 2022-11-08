import Board from "./Board";

export default function Setup(props: {}) {
    function Ship(name: string): {} {
        switch (name) {
            case "Carrier": {
                return {
                    name: "Carrier",
                    // health:,
                    isPlaced: false,
                    active: true,
                };
            }
            case "Battleship": {
                return {
                    name: "Battleship",
                    // health:,
                    isPlaced: false,
                    active: true,
                };
            }
            case "Cruiser": {
                return {
                    name: "Cruiser",
                    // health:,
                    isPlaced: false,
                    active: true,
                };
            }
            case "Submarine": {
                return {
                    name: "Submarine",
                    // health:,
                    isPlaced: false,
                    active: true,
                };
            }
            case "Destroyer": {
                return {
                    name: "Destroyer",
                    // health:,
                    isPlaced: false,
                    active: true,
                };
            }
        }

        return {};
    }

    return (
        <div>
            <Board />
            <div>
                <button
                    onClick={(e) =>
                        console.log((e.target as HTMLElement).textContent)
                    }
                >
                    Carrier
                </button>
                <button
                    onClick={(e) =>
                        console.log((e.target as HTMLElement).textContent)
                    }
                >
                    Battleship
                </button>
                <button
                    onClick={(e) =>
                        console.log((e.target as HTMLElement).textContent)
                    }
                >
                    Cruiser
                </button>
                <button
                    onClick={(e) =>
                        console.log((e.target as HTMLElement).textContent)
                    }
                >
                    Submarine
                </button>
                <button
                    onClick={(e) =>
                        console.log((e.target as HTMLElement).textContent)
                    }
                >
                    Destroyer
                </button>
            </div>
        </div>
    );
}
