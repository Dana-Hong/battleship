import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {
    return (
        <div className="main-menu">
            <h1 className="title">Battleship</h1>
            <div className="menu-buttons">
                <button>
                    <Link to="/setup">Start Game</Link>
                </button>
                {/* <button>
                    <Link to="/how-to-play">How to play</Link>
                </button>
                <button>
                    <Link to="/game-history">Battle History</Link>
                </button> */}
            </div>
        </div>
    );
}
