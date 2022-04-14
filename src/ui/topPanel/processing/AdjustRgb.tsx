import React, { useEffect, useState } from "react";
import { ToolbarMenuItem } from "../ToolbarMenuItem";
import { generatePseudolayer } from "../../mapPanel/layers/pseudolayer";
import { baseVertex } from "../../../webgl/shaders/base.vertex";
import { adjustColorsFragment } from "../../../webgl/shaders/adjustColors.fragment";
import { GetActiveUiLayer } from "../../../hooks/GetActiveUiLayer";
import { ErrorNotification } from "../../../components/ErrorNotification";
import { HorizontalStack } from "../../../components/HorizontalStack";
import { Icon } from "../../../components/Icon";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { Header1, Body1 } from "../../../components/Typography";
import { VerticalStack } from "../../../components/VerticalStack";
import { HandleUiState } from "../../../hooks/HandleUiState";
import { Slider, SliderValueProps } from "../../../components/Slider";
import { HandleUiLayerState } from "../../../hooks/HandleUiLayerState";
import update from "immutability-helper";
import throttle from "lodash.throttle";
import shallow from "zustand/shallow";
import { RemovePendingLayerFromActiveUiLayer } from "../../../hooks/SetPseudolayerHooks";

const defaultValues = {
    red: "1",
    green: "1",
    blue: "1",
};

export const AdjustRgb = (): JSX.Element => {
    const [sliderValues, setSliderValues] =
        useState<SliderValueProps>(defaultValues);
    const [error, setError] = useState<string>();
    const [displayUi, setDisplayUi] = useState(false);
    const { bindUi, unbindUi } = HandleUiState(
        (state) => ({
            bindUi: state.bindUi,
            unbindUi: state.unbindUi,
        }),
        shallow
    );
    const { uiLayers, setUiLayers } = HandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );

    const { activeUiLayer, activeIndex } = GetActiveUiLayer(uiLayers);

    const setRGBValues = throttle((colours: SliderValueProps) => {
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
            dynamics: {},
            shaders: {
                vertexShader: baseVertex,
                fragmentShader: adjustColorsFragment,
            },
        });

        setUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    pendingPseudolayer: {
                        $set: pseudolayer,
                    },
                },
            })
        );

        setSliderState(colours);
    }, 250);

    const reset = () => {
        if (!(activeUiLayer && activeIndex !== undefined)) return;

        setUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    pendingPseudolayer: {
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
                activeUiLayer.pendingPseudolayer &&
                activeIndex !== undefined
            )
        )
            return;

        const updatedUiLayer = activeUiLayer?.pendingPseudolayer;
        setUiLayers(
            update(uiLayers, {
                [activeIndex]: {
                    config: {
                        pseudolayer: {
                            $set: updatedUiLayer,
                        },
                    },
                    pendingPseudolayer: {
                        $set: undefined,
                    },
                },
            })
        );

        setSliderState(defaultValues);
    };

    const onSubmit = () => {
        apply();
        unbindUi();
        setDisplayUi(false);
    };

    const onClose = () => {
        reset();
        unbindUi();
        setDisplayUi(false);
    };

    const setSliderState = (colours: SliderValueProps) => {
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

    const onRedChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setRGBValues({
            red: value,
            green: sliderValues.green,
            blue: sliderValues.blue,
        });
    };

    const onGreenChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setRGBValues({
            red: sliderValues.red,
            green: value,
            blue: sliderValues.blue,
        });
    };

    const onBlueChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setRGBValues({
            red: sliderValues.red,
            green: sliderValues.green,
            blue: value,
        });
    };

    const onError = (message: string | undefined) => {
        setError(message);
    };

    useEffect(() => {
        displayUi && bindUi(AdjustRgbUi());
    }, [displayUi, sliderValues, error]);

    const AdjustRgbUi = (): JSX.Element => {
        return (
            <VerticalStack spacing={2}>
                <HorizontalStack className="justify-between mb-1">
                    <Header1>Adjust RGB</Header1>
                    <Icon className="i-mdi-close" onClick={onClose} />
                </HorizontalStack>
                <>{error && <ErrorNotification errorText={error} />}</>
                <Body1>Red</Body1>
                <Slider
                    step={0.01}
                    min={0}
                    max={3}
                    defaultValue={1}
                    onChange={onRedChange}
                    onError={onError}
                />
                <Body1>Green</Body1>
                <Slider
                    step={0.01}
                    min={0}
                    max={3}
                    defaultValue={1}
                    onChange={onGreenChange}
                    onError={onError}
                />
                <Body1>Blue</Body1>
                <Slider
                    step={0.01}
                    min={0}
                    max={3}
                    defaultValue={1}
                    onChange={onBlueChange}
                    onError={onError}
                />
                <div className="flex flex-col justify-center items-center children:w-25">
                    <PrimaryButton
                        text="Apply"
                        onClick={onSubmit}
                        active={!error}
                    />
                </div>
            </VerticalStack>
        );
    };

    return (
        <ToolbarMenuItem
            active={true}
            onClick={() => setDisplayUi(true)}
            name={"Adjust RGB"}
        />
    );
};
