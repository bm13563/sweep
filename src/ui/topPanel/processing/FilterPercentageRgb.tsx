import throttle from "lodash.throttle";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { Dropdown } from "../../../components/Dropdown";
import { ErrorNotification } from "../../../components/ErrorNotification";
import { HorizontalStack } from "../../../components/HorizontalStack";
import { Icon } from "../../../components/Icon";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { SliderValueProps, Slider } from "../../../components/Slider";
import { Header1, Body1 } from "../../../components/Typography";
import { VerticalStack } from "../../../components/VerticalStack";
import { GetActiveUiLayer } from "../../../hooks/GetActiveUiLayer";
import { HandleUiLayerState } from "../../../hooks/HandleUiLayerState";
import { HandleUiState } from "../../../hooks/HandleUiState";
import { baseVertex } from "../../../webgl/shaders/base.vertex";
import { generatePseudolayer } from "../../mapPanel/layers/pseudolayer";
import { ToolbarMenuItem } from "../ToolbarMenuItem";
import update from "immutability-helper";
import { filterPercentageRgbFragment } from "../../../webgl/shaders/filterPercentageRgbFragment";

type operatorTypes = "less than" | "greater than";

const defaultValues = {
    red: "100",
    green: "100",
    blue: "100",
};

const defaultOperator = "greater than";

const operatorMapping = {
    "greater than": "greaterThan",
    "less than": "lessThan",
};

export const FilterPercentageRgb = (): JSX.Element => {
    const [sliderValues, setSliderValues] =
        useState<SliderValueProps>(defaultValues);
    const [operator, setOperator] = useState<operatorTypes>(defaultOperator);
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

    const setAbsoluteRgb = throttle(
        (colours: SliderValueProps, operator: operatorTypes) => {
            if (!(activeUiLayer && activeIndex !== undefined)) return;

            const pseudolayer = generatePseudolayer({
                inputs: {
                    u_image: activeUiLayer.config.pseudolayer,
                },
                variables: {
                    r_max: String(Number(colours.red) / 100),
                    g_max: String(Number(colours.green) / 100),
                    b_max: String(Number(colours.blue) / 100),
                },
                dynamics: {
                    operator: operatorMapping[operator],
                },
                shaders: {
                    vertexShader: baseVertex,
                    fragmentShader: filterPercentageRgbFragment,
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

            setSliderValues(colours);
            setOperator(operator);
        },
        250
    );

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

        setSliderValues(defaultValues);
        setOperator(defaultOperator);
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

        setSliderValues(defaultValues);
        setOperator(defaultOperator);
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

    const onRedChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setAbsoluteRgb(
            {
                red: value,
                green: sliderValues.green,
                blue: sliderValues.blue,
            },
            operator
        );
    };

    const onGreenChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setAbsoluteRgb(
            {
                red: sliderValues.red,
                green: value,
                blue: sliderValues.blue,
            },
            operator
        );
    };

    const onBlueChange = (value: string) => {
        if (!activeUiLayer) return;
        setError(undefined);

        setAbsoluteRgb(
            {
                red: sliderValues.red,
                green: sliderValues.green,
                blue: value,
            },
            operator
        );
    };

    const handleOperator = (value: string) => {
        if (value === "greater than" || value === "less than") {
            setAbsoluteRgb(
                {
                    red: sliderValues.red,
                    green: sliderValues.green,
                    blue: sliderValues.blue,
                },
                value
            );
        }
    };

    const onError = (message: string | undefined) => {
        setError(message);
    };

    useEffect(() => {
        displayUi && bindUi(AdjustRgbUi());
    }, [displayUi, sliderValues, operator, error]);

    const AdjustRgbUi = (): JSX.Element => {
        return (
            <VerticalStack spacing={2}>
                <HorizontalStack className="justify-between mb-1">
                    <Header1>Filter absolute RGB</Header1>
                    <Icon className="i-mdi-close" onClick={onClose} />
                </HorizontalStack>
                <>{error && <ErrorNotification errorText={error} />}</>
                <Body1>Red</Body1>
                <Slider
                    step={1}
                    min={0}
                    max={100}
                    defaultValue={100}
                    onChange={onRedChange}
                    onError={onError}
                />
                <Body1>Green</Body1>
                <Slider
                    step={1}
                    min={0}
                    max={100}
                    defaultValue={100}
                    onChange={onGreenChange}
                    onError={onError}
                />
                <Body1>Blue</Body1>
                <Slider
                    step={1}
                    min={0}
                    max={100}
                    defaultValue={100}
                    onChange={onBlueChange}
                    onError={onError}
                />
                <Body1>Operator</Body1>
                <Dropdown
                    options={["greater than", "less than"]}
                    onChange={handleOperator}
                    defaultValue={operator}
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
            name={"Filter Percentage RGB"}
        />
    );
};
