import React, { useCallback, useEffect, useState } from "react";
import { ActionConfig } from "../actionPanel/Action";
import { useAction } from "../actionPanel/ActionContext";
import { getActiveUiLayer, UiLayer } from "../uiLayer";
import { ToolbarMenuItem } from "./ToolbarMenuItem";
import update from "immutability-helper";
import { generatePseudolayer } from "../mapPanel/layers/pseudolayer";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { adjustColorsFragment } from "../../webgl/shaders/adjustColors.fragment";
import throttle from "lodash.throttle";
import { Toolbar } from "@mui/material";

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

export const AdjustColours = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [sliderValues, setSliderValues] = useState<
        Record<string, ColourProps>
    >({});
    const [resetSliderValues, setResetSliderValues] = useState<
        Record<string, ColourProps>
    >({});

    const { activeUiLayer, activeIndex } = getActiveUiLayer(uiLayers);

    console.log(1, activeUiLayer);

    const setRGBValues = useCallback(
        throttle((colours: ColourProps) => {
            if (!(activeUiLayer && activeIndex !== undefined)) return;

            console.log(activeUiLayer.config.pseudolayer);

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
                [activeUiLayer.uid]: {
                    $set: {
                        red: colours.red,
                        green: colours.green,
                        blue: colours.blue,
                    },
                },
            })
        );
    };

    const reset = () => {
        if (!(activeUiLayer && activeIndex !== undefined)) return;

        setSliderState(resetSliderValues[activeUiLayer.uid]);

        updateUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    updatedPseudolayer: {
                        $set: undefined,
                    },
                },
            })
        );
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
        console.log(updatedUiLayer);
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

        setResetSliderValues(
            update(resetSliderValues, {
                [activeUiLayer.uid]: {
                    $set: {
                        red: sliderValues[activeUiLayer.uid].red,
                        green: sliderValues[activeUiLayer.uid].green,
                        blue: sliderValues[activeUiLayer.uid].blue,
                    },
                },
            })
        );
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
            green: sliderValues[activeUiLayer.uid].green,
            blue: sliderValues[activeUiLayer.uid].blue,
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
                value:
                    activeUiLayer && Object.keys(sliderValues).length > 0
                        ? sliderValues[activeUiLayer.uid].red
                        : "1",
                min: 0,
                max: 5,
                onChange: onRedChange,
            },
        ],
    };

    activeUiLayer &&
        Object.keys(sliderValues).length > 0 &&
        console.log(sliderValues[activeUiLayer.uid].red);

    useAction({ newConfig: config, displayAction: displayAction });

    useEffect(() => {
        if (activeUiLayer && !(activeUiLayer.uid in sliderValues)) {
            setSliderValues(
                update(sliderValues, {
                    [activeUiLayer.uid]: {
                        $set: defaultValues,
                    },
                })
            );

            setResetSliderValues(
                update(resetSliderValues, {
                    [activeUiLayer.uid]: {
                        $set: defaultValues,
                    },
                })
            );
        }
    }, [activeUiLayer, activeIndex]);

    return (
        <ToolbarMenuItem onClick={() => setDisplayAction(true)}>
            Adjust Colours
        </ToolbarMenuItem>
    );
};

// const setRGBValues = useCallback(
//     throttle((colours: ColourProps) => {
//         if (!(activeUiLayer && activeIndex !== undefined)) return;

//         const pseudolayer = generatePseudolayer({
//             inputs: {
//                 u_image: activeUiLayer.config.pseudolayer,
//             },
//             variables: {
//                 r_colour: colours.red,
//                 g_colour: colours.green,
//                 b_colour: colours.blue,
//             },
//             shaders: {
//                 vertexShader: baseVertex,
//                 fragmentShader: adjustColorsFragment,
//             },
//         });

//         updateUiLayers(
//             update(uiLayers, {
//                 [activeIndex]: {
//                     updatedPseudolayer: {
//                         $set: pseudolayer,
//                     },
//                 },
//             })
//         );
//     }, 100),
//     []
// );

// const applyAdjustColors = () => {
//     if (
//         !(
//             activeUiLayer &&
//             activeUiLayer.updatedPseudolayer &&
//             activeIndex !== undefined
//         )
//     ) {
//         return;
//     }

//     const updatedUiLayer = activeUiLayer?.updatedPseudolayer;
//     updateUiLayers(
//         update(uiLayers, {
//             [activeIndex]: {
//                 config: {
//                     pseudolayer: {
//                         $set: updatedUiLayer,
//                     },
//                 },
//                 updatedPseudolayer: {
//                     $set: undefined,
//                 },
//             },
//         })
//     );

//     setDefaultValue({
//         layerId: activeUiLayer.uid,
//         red: sliderValues.red,
//         green: sliderValues.green,
//         blue: sliderValues.blue,
//     });
// };

// const removeTransientEffects = () => {
//     if (!(activeUiLayer && activeIndex !== undefined)) return;

//     setSliderValues(defaultValue);

//     updateUiLayers(
//         update(uiLayers, {
//             [activeIndex]: {
//                 updatedPseudolayer: {
//                     $set: undefined,
//                 },
//             },
//         })
//     );
// };

// const onSubmit = () => {
//     applyAdjustColors();
//     // removeTransientEffects();
//     setDisplayAction(false);
// };

// const onClose = () => {
//     removeTransientEffects();
//     setDisplayAction(false);
// };

// const addAction = () => {
//     setDisplayAction(true);
// };

// const onRedChange = (
//     event: Event,
//     value: number | number[],
//     activeThumb: number
// ) => {
//     typeof value === "number" &&
//         setSliderValues({ ...sliderValues, red: `${value}` });
//     setRGBValues({
//         ...sliderValues,
//         red: `${value}`,
//     });
// };

// const onGreenChange = (
//     event: Event,
//     value: number | number[],
//     activeThumb: number
// ) => {
//     typeof value === "number" &&
//         setSliderValues({ ...sliderValues, green: `${value}` });
//     setRGBValues({
//         ...sliderValues,
//         green: `${value}`,
//     });
// };

// const onBlueChange = (
//     event: Event,
//     value: number | number[],
//     activeThumb: number
// ) => {
//     typeof value === "number" &&
//         setSliderValues({ ...sliderValues, blue: `${value}` });
//     setRGBValues({
//         ...sliderValues,
//         blue: `${value}`,
//     });
// };

// const config: ActionConfig = {
//     title: "Update colours",
//     onSubmit: onSubmit,
//     onClose: onClose,
//     sections: [
//         {
//             title: "red",
//             type: "slider",
//             step: 0.01,
//             value: sliderValues.red,
//             min: 0,
//             max: 5,
//             onChange: onRedChange,
//         },
//         {
//             title: "green",
//             type: "slider",
//             step: 0.01,
//             value: sliderValues.green,
//             min: 0,
//             max: 5,
//             onChange: onGreenChange,
//         },
//         {
//             title: "blue",
//             type: "slider",
//             step: 0.01,
//             value: sliderValues.blue,
//             min: 0,
//             max: 5,
//             onChange: onBlueChange,
//         },
//     ],
// };

// useAction({ newConfig: config, displayAction: displayAction });
