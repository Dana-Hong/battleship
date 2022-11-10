import { useContext } from "react";
import LocationContext from "./locationContext";

import "./coordinate.scss";

export default function Coordinate(props: {
    location: string;
    targeted: null | boolean;
    occupied: null | boolean;
}) {
    const { location, targeted, occupied } = props;
    const locationContext = useContext(LocationContext);
    return (
        <div
            className={`coordinate ${props.occupied}`}
            id={location}
            // onClick={(event) =>
            //     locationContext.placeShip(
            //         locationContext.selectedShip,
            //         event.target.id
            //     )
            // }
            onClick={(event) =>
                console.log((event.target as HTMLDivElement).id)
            }
            onMouseOver={(event) =>
                console.log((event.target as HTMLDivElement).id)
            }
        ></div>
    );
}
