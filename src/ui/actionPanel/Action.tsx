import { Box, Slider } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "../../components/Button";
import { Body1, Header1 } from "../../components/Typography";
import { Icon } from "../../components/Icon";
import { VerticalStack } from "../../components/VerticalStack";
import { HorizontalStack } from "../../components/HorizontalStack";
import { ErrorNotification } from "../../components/ErrorNotification";
import { TextField2 } from "../../components/TextField";
import { Dropdown2 } from "../../components/Dropdown";

export type ActionSection =
    | ActionSectionInput
    | ActionSectionDropdown
    | ActionSectionSlider
    | ActionSectionTextField;

interface ActionSectionBase {
    title: string;
    value?: string;
    customChild?: JSX.Element;
}

interface ActionSectionInput extends ActionSectionBase {
    type: "input";
    onChange?: (value: string) => void;
}

interface ActionSectionDropdown extends ActionSectionBase {
    type: "dropdown";
    items: string[];
    onChange: (value: string) => void;
}

interface ActionSectionSlider extends ActionSectionBase {
    type: "slider";
    step: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

interface ActionSectionTextField extends ActionSectionBase {
    type: "textField";
    onChange: (value: string) => void;
}

export interface ActionConfig {
    title: string;
    sections: ActionSection[];
    onClose: () => void;
    onSubmit?: () => void;
    onMount?: () => void;
    onUnmount?: () => void;
    errors?: string[];
}

export const Action = ({ config }: { config: ActionConfig }): JSX.Element => {
    const onSubmitWithUnmount = () => {
        if (config.onUnmount) {
            config.onUnmount();
        }

        if (config.onSubmit) {
            !(config.errors && config.errors.length > 0) && config.onSubmit();
        }
    };

    const onCloseWithUnmount = () => {
        if (config.onUnmount) {
            config.onUnmount();
        }
        config.onClose();
    };

    useEffect(() => {
        if (config.onMount) {
            config.onMount();
        }
    }, []);

    return (
        <div className="p-4 bg-emerald-400 border">
            <VerticalStack>
                <HorizontalStack className="justify-between mb-1">
                    <Header1>{config.title}</Header1>
                    <Icon
                        className="i-mdi-close"
                        onClick={onCloseWithUnmount}
                    />
                </HorizontalStack>
                <>
                    {config.errors && config.errors.length > 0 && (
                        <ErrorNotification
                            errorText={config.errors.join(",")}
                        />
                    )}
                </>
                <>
                    {config.sections.map((section, index) => {
                        return (
                            <div key={index} className="mb-1">
                                <Body1>{section.title}</Body1>
                                {actionParser(section)}
                            </div>
                        );
                    })}
                </>
                <>
                    {config.onSubmit && (
                        <Button text={"Apply"} onClick={onSubmitWithUnmount} />
                    )}
                </>
            </VerticalStack>
        </div>
    );
};

const actionParser = (actionSection: ActionSection) => {
    switch (actionSection.type) {
        case "input": {
            return renderInput(actionSection);
        }
        case "dropdown": {
            return renderDropdown(actionSection);
        }
        case "slider": {
            return renderSlider(actionSection);
        }
        case "textField": {
            return renderTextField(actionSection);
        }
    }
};

const renderInput = (config: ActionSectionInput) => {
    return (
        <TextField2 defaultValue={config.value} onChange={config.onChange} />
    );
};

const renderDropdown = (config: ActionSectionDropdown): JSX.Element => {
    return <Dropdown2 options={config.items} onChange={config.onChange} />;
};

const renderSlider = (config: ActionSectionSlider): JSX.Element => {
    const terseOnChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        config.onChange && typeof value === "number" && config.onChange(value);
    };
    return (
        <Box>
            <Slider
                key={config.title}
                step={config.step}
                min={config.min}
                max={config.max}
                value={config.value ? parseFloat(config.value) : undefined}
                valueLabelDisplay="auto"
                onChange={terseOnChange}
            />
        </Box>
    );
};

const renderTextField = (config: ActionSectionTextField): JSX.Element => {
    return (
        <TextField2
            lines={4}
            defaultValue={config.value}
            onChange={config.onChange}
        />
    );
};
