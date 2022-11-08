import "./coordinate.scss";

export default function Coordinate(props: {
    latitudeCoordinate: string;
    longitudeCoordinate: string;
}) {
    const { latitudeCoordinate, longitudeCoordinate } = props;
    return (
        <div
            className="coordinate"
            id={`${latitudeCoordinate}${longitudeCoordinate}`}
        >
            {/* {latitudeCoordinate}
            {longitudeCoordinate} */}
        </div>
    );
}
