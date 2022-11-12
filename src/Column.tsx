import Coordinate from "./Coordinate";
import { nanoid } from "nanoid";

export default function Column(props: {
    longituteCoordinates: string[];
    latitudeCoordinate: string;
}) {
    const { longituteCoordinates, latitudeCoordinate } = props;
    const rowElements = longituteCoordinates.map((longituteCoordinate) => {
        return (
            <Coordinate
                key={nanoid()}
                latitudeCoordinate={latitudeCoordinate}
                longitudeCoordinate={longituteCoordinate}
            />
        );
    });

    return <div>{rowElements}</div>;
}
