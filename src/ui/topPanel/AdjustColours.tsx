import React, { useCallback, useEffect, useState } from "react";
import { ActionConfig } from "../actionPanel/Action";
import { useAction } from "../actionPanel/ActionContext";
import { getActiveUiLayer, UiLayer } from "../uiLayer";
import { ToolbarMenuItem } from "./ToolbarMenuItem";
import update from "immutability-helper";
import { generatePseudolayer2 } from "../mapPanel/layers/pseudolayer2";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { adjustColorsFragment } from "../../webgl/shaders/adjustColors.fragment";
import throttle from "lodash.throttle";

export interface AdjustColorsProps {
    red: string;
    green: string;
    blue: string;
}

export const AdjustColours = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}) => {
    const [displayAction, setDisplayAction] = useState(false);
    const [redValue, setRedValue] = useState("1");
    const [blueValue, setBlueValue] = useState("1");
    const [greenValue, setGreenValue] = useState("1");

    const { activeUiLayer, activeIndex } = getActiveUiLayer(uiLayers);

    const setRGBValues = useCallback(
        throttle((colours: AdjustColorsProps) => {
            if (!(activeUiLayer && activeIndex !== undefined)) return;

            const pseudolayer = generatePseudolayer2({
                inputs: {
                    u_image: activeUiLayer.config.pseudolayer,
                },
                variables: {
                    r_colour: colours.red,
                    g_colour: colours.green,
                    b_colour: colours.blue,
                },
                shaders: {
                    vertexShader: baseVertex,
                    fragmentShader: adjustColorsFragment,
                },
            });

            updateUiLayers(
                update(uiLayers, {
                    [activeIndex]: {
                        updatedPseudolayer: {
                            $set: pseudolayer,
                        },
                    },
                })
            );
        }, 100),
        []
    );

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
    };

    const onGreenChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        typeof value === "number" && setGreenValue(`${value}`);
    };

    const onBlueChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        typeof value === "number" && setBlueValue(`${value}`);
        setRGBValues({
            red: redValue,
            green: greenValue,
            blue: blueValue,
        });
    };

    const config: ActionConfig = {
        title: "Update colours",
        onSubmit: onSubmit,
        onClose: onClose,
        sections: [
            {
                title: "red",
                type: "slider",
                step: 0.01,
                value: redValue,
                min: 0,
                max: 5,
                onChange: onRedChange,
            },
            {
                title: "green",
                type: "slider",
                step: 0.01,
                value: greenValue,
                min: 0,
                max: 5,
                onChange: onGreenChange,
            },
            {
                title: "blue",
                type: "slider",
                step: 0.01,
                value: blueValue,
                min: 0,
                max: 5,
                onChange: onBlueChange,
            },
        ],
    };

    useAction({ newConfig: config, displayAction: displayAction });

    useEffect(() => {
        setRGBValues({
            red: redValue,
            green: greenValue,
            blue: blueValue,
        });
    }, [redValue, greenValue, blueValue]);

    return (
        <>
            <ToolbarMenuItem onClick={addAction}>
                Adjust Colours
            </ToolbarMenuItem>
        </>
    );
};
