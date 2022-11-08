import { Link } from "react-router-dom";

export default function Home(props) {
    return (
        <div className="main-menu">
            <h1>Battleship</h1>
            <div>
                <button>
                    <Link to="/setup">Start Game</Link>
                </button>
                <button>
                    <Link to="/how-to-play">How to play</Link>
                </button>
                <button>
                    <Link to="/game-history">Battle History</Link>
                </button>
            </div>
        </div>
    );
}
