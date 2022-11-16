import React, { useEffect, useState } from "react";
import Coordinate from "./Coordinate";

import {
    longitudeCoordinates,
    latitudeCoordinates,
    generateCoordinates,
} from "./generateCoordinates";

import { ShipInterface } from "./interfaces";
import { Fleet, CoordinateType, highlightCoordinates } from "./types";

import "./board.scss";

export default function Board(props: {
    setup: boolean;
    selectedShip?: ShipInterface;
    highlightedCoordinates?: string[];
    highlightCoordinates?: highlightCoordinates;
    target?: ((id: string) => void) | undefined;
    axis?: "X" | "Y" | undefined;
    fleet: Fleet;
    coordinates?: CoordinateType[];
    setCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
    isPlayerBoard?: boolean;
    winner?: string | null;
}) {
    const {
        setup,
        selectedShip,
        highlightedCoordinates,
        highlightCoordinates,
        target,
        axis,
        fleet,
        coordinates,
        setCoordinates,
        isPlayerBoard,
        winner,
    } = props;

    useEffect(() => {
        if (setup === true && selectedShip === null) {
            return;
        } else if (setup === true) {
            setCoordinates((prevCoordinates) => {
                return prevCoordinates.map((coordinate) => {
                    const highlightedCoordinate = highlightedCoordinates!.includes(
                        coordinate.location
                    );
                    if (
                        highlightedCoordinate &&
                        highlightedCoordinates!.length === selectedShip!.health
                    ) {
                        return { ...coordinate, hovered: "valid" };
                    } else if (
                        highlightedCoordinate &&
                        highlightedCoordinates!.length !== selectedShip!.health
                    ) {
                        return { ...coordinate, hovered: "invalid" };
                    } else {
                        return { ...coordinate, hovered: null };
                    }
                });
            });
        }
    }, [highlightedCoordinates]);

    const coordinateElements = coordinates!.map((coordinate) => {
        if (setup) {
            return (
                <Coordinate // SETUP COORDINATES
                    key={coordinate.location}
                    setup={true}
                    location={coordinate.location}
                    targeted={coordinate.targeted}
                    occupied={coordinate.occupied}
                    hovered={coordinate.hovered}
                    highlightCoordinates={highlightCoordinates}
                    selectedShip={selectedShip}
                    axis={axis}
                    fleet={fleet}
                    isPlayerBoard={isPlayerBoard}
                />
            );
        } else if (isPlayerBoard) {
            return (
                <Coordinate // PLAYER COORDINATES
                    key={coordinate.location}
                    setup={false}
                    location={coordinate.location}
                    targeted={coordinate.targeted}
                    target={target}
                    occupied={coordinate.occupied}
                    fleet={fleet}
                    isPlayerBoard={isPlayerBoard}
                />
            );
        } else {
            return (
                <Coordinate // OPPONENT COORDINATES
                    key={coordinate.location}
                    setup={false}
                    location={coordinate.location}
                    targeted={coordinate.targeted}
                    target={target}
                    occupied={coordinate.occupied}
                    fleet={fleet}
                    isPlayerBoard={isPlayerBoard}
                    winner={winner}
                />
            );
        }
    });

    useEffect(() => {
        const fleetLocation = fleet
            .map((ship) => {
                return ship.location;
            })
            .flat();

        setCoordinates((prevCoordinates) => {
            return prevCoordinates.map((coordinate) => {
                if (fleetLocation.includes(coordinate.location)) {
                    return { ...coordinate, occupied: true };
                } else {
                    return { ...coordinate, occupied: false };
                }
            });
        });
    }, [fleet]);

    const longitudeElements = longitudeCoordinates.map((coordinate) => (
        <p className="label" key={coordinate}>
            {coordinate}
        </p>
    ));
    const latitudeElements = latitudeCoordinates.map((coordinate) => (
        <p className="label" key={coordinate}>
            {coordinate}
        </p>
    ));
    return (
        <div className="board-container">
            <div className="latitude-labels">{latitudeElements}</div>
            <div className="longitude-labels">{longitudeElements}</div>
            <div className="board">{coordinateElements}</div>
        </div>
    );
}
