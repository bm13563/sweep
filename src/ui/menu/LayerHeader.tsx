import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Action, ActionConfig } from "../actions/Action";

export const LayerHeader = ({
    setAction,
}: {
    setAction: (component: JSX.Element | undefined) => void;
}): JSX.Element => {
    const config: ActionConfig = {
        title: "Add layer",
        setAction: setAction,
        sections: [
            {
                type: "input",
                title: "URL",
            },
            {
                type: "dropdown",
                title: "Layer type",
                items: ["tile", "vector"],
                default: "tile",
            },
            {
                type: "slider",
                title: "whoa a slider",
                default: "50",
            },
        ],
    };

    const addAction = () => {
        setAction(Action({ config: config }));
    };

    return (
        <Box
            sx={{
                width: "90%",
                justifyContent: "center",
            }}
        >
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography variant="h4">Layers</Typography>
                <AddIcon sx={{ marginLeft: "auto" }} onClick={addAction} />
            </Stack>
        </Box>
    );
};
