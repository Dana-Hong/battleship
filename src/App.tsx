import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Setup from "./Setup";
import Game from "./Play";
import HowToPlay from "./HowToPlay";
import History from "./History";

import reactLogo from "./assets/react.svg";
import "./App.scss";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/play" element={<Game />} />
                <Route path="/how-to-play" element={<HowToPlay />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </main>
    );
}
// <div className="App">
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" className="logo" alt="Vite logo" />
//     </a>
//     <a href="https://reactjs.org" target="_blank">
//       <img src={reactLogo} className="logo react" alt="React logo" />
//     </a>
//   </div>
//   <h1>Vite + React</h1>
//   <div className="card">
//     <button onClick={() => setCount((count) => count + 1)}>
//       count is {count}
//     </button>
//     <p>
//       Edit <code>src/App.tsx</code> and save to test HMR
//     </p>
//   </div>
//   <p className="read-the-docs">
//     Click on the Vite and React logos to learn more
//   </p>
// </div>
export default App;
