import React, { useCallback, useState } from "react";
import { ActionConfig } from "../../actionPanel/Action";
import { useAction } from "../../actionPanel/ActionContext";
import { getActiveUiLayer, UiLayer } from "../../uiLayer";
import { ToolbarMenuItem } from "../ToolbarMenuItem";
import update from "immutability-helper";
import { generatePseudolayer } from "../../mapPanel/layers/pseudolayer";
import { baseVertex } from "../../../webgl/shaders/base.vertex";
import { adjustColorsFragment } from "../../../webgl/shaders/adjustColors.fragment";
import throttle from "lodash.throttle";

const defaultValues = {
    red: "1",
    green: "1",
    blue: "1",
};

export interface ColourProps {
    red: string;
    green: string;
    blue: string;
}

export const RgbManipulation = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [sliderValues, setSliderValues] =
        useState<ColourProps>(defaultValues);

    const { activeUiLayer, activeIndex } = getActiveUiLayer(uiLayers);

    const setRGBValues = useCallback(
        throttle((colours: ColourProps) => {
            if (!(activeUiLayer && activeIndex !== undefined)) return;

            const pseudolayer = generatePseudolayer({
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

            setSliderState(colours);
        }, 100),
        [activeUiLayer]
    );

    const setSliderState = (colours: ColourProps) => {
        if (!activeUiLayer) return;

        setSliderValues(
            update(sliderValues, {
                $set: {
                    red: colours.red,
                    green: colours.green,
                    blue: colours.blue,
                },
            })
        );
    };

    const reset = () => {
        if (!(activeUiLayer && activeIndex !== undefined)) return;

        updateUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    updatedPseudolayer: {
                        $set: undefined,
                    },
                },
            })
        );

        setSliderState(defaultValues);
    };

    const apply = () => {
        if (
            !(
                activeUiLayer &&
                activeUiLayer.updatedPseudolayer &&
                activeIndex !== undefined
            )
        )
            return;

        const updatedUiLayer = activeUiLayer?.updatedPseudolayer;
        updateUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    config: {
                        pseudolayer: {
                            $set: updatedUiLayer,
                        },
                    },
                    updatedPseudolayer: {
                        $set: undefined,
                    },
                },
            })
        );

        setSliderState(defaultValues);
    };

    const onSubmit = () => {
        apply();
        setDisplayAction(false);
    };

    const onClose = () => {
        reset();
        setDisplayAction(false);
    };

    const onRedChange = (value: number) => {
        if (!activeUiLayer) return;

        setRGBValues({
            red: `${value}`,
            green: sliderValues.green,
            blue: sliderValues.blue,
        });
    };

    const onGreenChange = (value: number) => {
        if (!activeUiLayer) return;

        setRGBValues({
            red: sliderValues.red,
            green: `${value}`,
            blue: sliderValues.blue,
        });
    };

    const onBlueChange = (value: number) => {
        if (!activeUiLayer) return;

        setRGBValues({
            red: sliderValues.red,
            green: sliderValues.green,
            blue: `${value}`,
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
                value: sliderValues.red,
                min: 0,
                max: 5,
                onChange: onRedChange,
            },
            {
                title: "green",
                type: "slider",
                step: 0.01,
                value: sliderValues.green,
                min: 0,
                max: 5,
                onChange: onGreenChange,
            },
            {
                title: "blue",
                type: "slider",
                step: 0.01,
                value: sliderValues.blue,
                min: 0,
                max: 5,
                onChange: onBlueChange,
            },
        ],
    };

    useAction({ newConfig: config, displayAction: displayAction });

    return (
        <ToolbarMenuItem
            active={true}
            onClick={() => setDisplayAction(true)}
            name={"RGB Manipulation"}
        />
    );
};
