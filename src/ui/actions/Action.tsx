import {
    Box,
    InputLabel,
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
    default?: string;
    customChild?: JSX.Element;
    customStyles?: Record<string, string | number>;
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
    onChange?: (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => void;
}

export interface ActionConfig {
    title: string;
    setAction: (component: JSX.Element | undefined) => void;
    sections: ActionSection[];
}

export const Action = ({ config }: { config: ActionConfig }): JSX.Element => {
    return (
        <Box>
            <Stack>
                <Stack direction="row">
                    <Typography variant="h4">{config.title}</Typography>
                    <CloseIcon
                        onClick={() => config.setAction(undefined)}
                        sx={{ marginLeft: "auto" }}
                    />
                </Stack>
                {config.sections.map((section) => actionParser(section))}
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
        <>
            <InputLabel>{config.title}</InputLabel>
            <TextField
                defaultValue={config.default}
                onChange={config.onChange}
                sx={config.customStyles}
            >
                {config.customChild}
            </TextField>
        </>
    );
};

const renderDropdown = (config: ActionSectionDropdown): JSX.Element => {
    return (
        <>
            <InputLabel>{config.title}</InputLabel>
            <Select defaultValue={config.default} onChange={config.onChange}>
                {config.items.map((item) => {
                    return (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    );
                })}
            </Select>
        </>
    );
};

const renderSlider = (config: ActionSectionSlider): JSX.Element => {
    return (
        <>
            <InputLabel>{config.title}</InputLabel>
            <Slider
                defaultValue={
                    config.default ? parseFloat(config.default) : undefined
                }
                valueLabelDisplay="auto"
                onChange={config.onChange}
            />
        </>
    );
};
