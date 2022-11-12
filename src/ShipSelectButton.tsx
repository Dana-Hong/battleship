import { ShipNames, selectShip } from "./types";

const ShipSelectButton = (props: any) => {
    const { shipName, selectShip } = props;
    return (
        <button
            onClick={(e) => {
                // console.log((e.target as HTMLElement).textContent);
                selectShip((e.target as HTMLElement).textContent as ShipNames);
            }}
        >
            {shipName}
        </button>
    );
};

export default ShipSelectButton;
