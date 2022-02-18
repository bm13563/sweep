import React, { useEffect, useState } from "react";
import { UiLayer } from "../../uiLayer";
import { ToolbarMenuItem } from "../ToolbarMenuItem";
import update from "immutability-helper";

export const UndoRedo = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const pseudolayers = uiLayers.map((uiLayer) => uiLayer.config.pseudolayer);
    const hashedUiLayers = JSON.stringify(uiLayers);

    const [past, setPast] = useState<string[]>([]);
    const [present, setPresent] = useState<string>(hashedUiLayers);
    const [future, setFuture] = useState<string[]>([]);

    const undo = () => {
        const newUiLayer = past[past.length - 1];
        updateUiLayers(JSON.parse(newUiLayer));
        setPast(
            update(past, {
                $splice: [[past.length - 1, 1]],
            })
        );
        setPresent(newUiLayer);
        setFuture((prevState) => {
            return [...prevState, present];
        });
    };

    const redo = () => {
        const newUiLayer = future[future.length - 1];
        updateUiLayers(JSON.parse(newUiLayer));
        setFuture(
            update(future, {
                $splice: [[future.length - 1, 1]],
            })
        );
        setPresent(newUiLayer);
        setPast((prevState) => {
            return [...prevState, present];
        });
    };

    useEffect(() => {
        if (present === hashedUiLayers) {
            return;
        }
        setPresent(hashedUiLayers);
        setPast((prevState) => {
            return [...prevState, present];
        });
        setFuture([]);
    }, [JSON.stringify(pseudolayers)]);

    return (
        <>
            <ToolbarMenuItem
                active={past.length > 0}
                onClick={undo}
                name={"Undo"}
            />
            <ToolbarMenuItem
                active={future.length > 0}
                onClick={redo}
                name={"Redo"}
            />
        </>
    );
};
