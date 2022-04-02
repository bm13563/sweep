import {
    Box,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect } from "react";
import { Button } from "../../components/Button";
import { Header1 } from "../../components/Typography";
import { Icon } from "../../components/Icon";
import { colors, utility, spacing } from "../../themes";

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
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ActionSectionDropdown extends ActionSectionBase {
    type: "dropdown";
    items: string[];
    onChange?: (event: SelectChangeEvent<string>) => void;
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
        <Box
            sx={{
                padding: spacing.spacing4,
                ...colors.background.default,
                ...utility.radius,
            }}
        >
            <Stack spacing={0}>
                <Stack direction="row" sx={{ marginBottom: "1rem" }}>
                    <Header1>{config.title}</Header1>
                    <Icon
                        className="i-mdi-close ml-auto"
                        onClick={onCloseWithUnmount}
                    />
                </Stack>
                {config.errors && config.errors.length > 0 && (
                    <Box
                        sx={{
                            marginBottom: "1rem",
                            color: "red",
                        }}
                    >
                        <Typography>{config.errors.join(",")}</Typography>
                    </Box>
                )}
                {config.sections.map((section, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                marginBottom: "1rem",
                            }}
                        >
                            <Typography>{section.title}</Typography>
                            {actionParser(section)}
                        </Box>
                    );
                })}
                {config.onSubmit && (
                    <Button text={"Apply"} onClick={onSubmitWithUnmount} />
                )}
            </Stack>
        </Box>
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
        <Box>
            <TextField
                fullWidth
                defaultValue={config.value}
                onChange={config.onChange}
            >
                {config.customChild}
            </TextField>
        </Box>
    );
};

const renderDropdown = (config: ActionSectionDropdown): JSX.Element => {
    return (
        <Box>
            <Select
                fullWidth
                defaultValue={config.value}
                onChange={config.onChange}
            >
                {config.items.map((item) => {
                    return (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
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
        <Box>
            <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={config.value}
                onChange={config.onChange}
            />
        </Box>
    );
};
