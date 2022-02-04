import React, { useState } from "react";
import { ActionConfig } from "../actionPanel/Action";
import { useAction } from "../actionPanel/ActionContext";
import { UiLayer } from "../uiLayer";
import { ToolbarMenuItem } from "./ToolbarMenuItem";

export const AdjustColours = ({
    activeUiLayer,
}: {
    activeUiLayer: UiLayer | undefined;
}) => {
    const [displayAction, setDisplayAction] = useState(false);
    const [redValue, setRedValue] = useState("0");

    const onSubmit = () => {
        console.log("hi");
    };

    const onClose = () => {
        setDisplayAction(false);
    };

    const addAction = () => {
        setDisplayAction(true);
    };

    const onRedChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        typeof value === "number" && setRedValue(`${value}`);
        console.log(value);
    };

    const config: ActionConfig = {
        title: "Update colours",
        onSubmit: onSubmit,
        onClose: onClose,
        sections: [
            {
                title: "red",
                type: "slider",
                value: redValue,
                min: 0,
                max: 100,
                onChange: onRedChange,
            },
        ],
    };

    useAction({ newConfig: config, displayAction: displayAction });

    return (
        <>
            <ToolbarMenuItem onClick={addAction}>
                Adjust Colours
            </ToolbarMenuItem>
        </>
    );
};
