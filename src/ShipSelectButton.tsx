import { ShipNames, selectShip } from "./types";

const ShipSelectButton = (props: any) => {
    const { shipName, selectShip } = props;
    return (
        <button
            onClick={(e) => {
                selectShip((e.target as HTMLElement).textContent as ShipNames);
            }}
        >
            {shipName}
        </button>
    );
};

export default ShipSelectButton;
