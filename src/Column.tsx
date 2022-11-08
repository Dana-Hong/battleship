import Coordinate from "./Coordinate";

export default function Column(props: {
    longituteCoordinates: string[];
    latitudeCoordinate: string;
}) {
    const { longituteCoordinates, latitudeCoordinate } = props;
    const rowElements = longituteCoordinates.map((longituteCoordinate) => {
        return (
            <Coordinate
                latitudeCoordinate={latitudeCoordinate}
                longitudeCoordinate={longituteCoordinate}
            />
        );
    });

    return <div>{rowElements}</div>;
}
