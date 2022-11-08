import { nanoid } from "nanoid";
import Column from "./Column";

import "./board.scss";
import Coordinate from "./Coordinate";

export default function Board() {
    const latCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const longCoordinates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    const columnElements = latCoordinates.map((latCoordinate) => {
        return (
            <Column
                key={nanoid()}
                longituteCoordinates={longCoordinates}
                latitudeCoordinate={latCoordinate}
            />
        );
    });

    const longitudeElements = longCoordinates.map((coordinate) => (
        <p className="label" key={coordinate}>
            {coordinate}
        </p>
    ));
    const latitudeElements = latCoordinates.map((coordinate) => (
        <p className="label" key={coordinate}>
            {coordinate}
        </p>
    ));
    return (
        <div className="board-container">
            <div className="latitude-labels">{latitudeElements}</div>
            <div className="longitude-labels">{longitudeElements}</div>
            <div className="board">{columnElements}</div>
        </div>
    );
}
