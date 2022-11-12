import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Setup from "./Setup";
import PlayGame from "./PlayGame";
import HowToPlay from "./HowToPlay";
import History from "./History";

import { generateCoordinates } from "./generateCoordinates";

import { CoordinateType, Fleet } from "./types";
import { ShipInterface } from "./interfaces";

import "./App.scss";

function App() {
    const [fleet, setFleet] = useState<Fleet>([]);
    const [coordinates, setCoordinates] = useState<CoordinateType[]>(generateCoordinates());

    console.log(fleet);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/setup" element={<Setup fleet={fleet} setFleet={setFleet} />} />
                <Route path="/playgame" element={<PlayGame fleet={fleet} setFleet={setFleet} />} />
                <Route path="/how-to-play" element={<HowToPlay />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </main>
    );
}
export default App;
