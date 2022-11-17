import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Setup from "./Setup";
import PlayGame from "./PlayGame";
// import HowToPlay from "./HowToPlay";
// import History from "./History";

import { generateCoordinates } from "./generateCoordinates";

import { CoordinateType, Fleet } from "./types";
import { ShipInterface } from "./interfaces";

import "./App.scss";

function App() {
    const [fleet, setFleet] = useState<Fleet>([]);
    const [opponentFleet, setOpponentFleet] = useState<Fleet>([]);
    const [coordinates, setCoordinates] = useState<CoordinateType[]>(generateCoordinates());
    const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/setup"
                    element={
                        <Setup
                            fleet={fleet}
                            setFleet={setFleet}
                            opponentFleet={opponentFleet}
                            setOpponentFleet={setOpponentFleet}
                            setupComplete={setupComplete}
                            setSetupComplete={setSetupComplete}
                        />
                    }
                />
                <Route
                    path="/playgame"
                    element={
                        <PlayGame
                            fleet={fleet}
                            setFleet={setFleet}
                            opponentFleet={opponentFleet}
                            setOpponentFleet={setOpponentFleet}
                            setupComplete={setupComplete}
                        />
                    }
                />
                {/* <Route path="/how-to-play" element={<HowToPlay />} /> */}
                {/* <Route path="/history" element={<History />} /> */}
            </Routes>
        </main>
    );
}
export default App;
