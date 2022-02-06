import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";

export type ActionSection =
    | ActionSectionInput
    | ActionSectionDropdown
    | ActionSectionSlider;

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
    onChange?: (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => void;
}

export interface ActionConfig {
    title: string;
    sections: ActionSection[];
    onSubmit: () => void;
    onClose: () => void;
}

export const Action = ({ config }: { config: ActionConfig }): JSX.Element => {
    return (
        <Box>
            <Stack spacing={0}>
                <Stack direction="row" sx={{ marginBottom: "1rem" }}>
                    <Typography variant="h4">{config.title}</Typography>
                    <CloseIcon
                        onClick={() => config.onClose()}
                        sx={{ marginLeft: "auto" }}
                    />
                </Stack>
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
                <Button onClick={config.onSubmit} variant="contained">
                    Apply
                </Button>
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
    return (
        <Box>
            <Slider
                key={config.title}
                step={config.step}
                min={config.min}
                max={config.max}
                value={config.value ? parseFloat(config.value) : undefined}
                valueLabelDisplay="auto"
                onChange={config.onChange}
            />
        </Box>
    );
};
