import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Action } from "./Action";
import { ActionState } from "./ActionContext";

export const ActionContainer = (): JSX.Element => {
    const { configState } = useContext(ActionState);

    return (
        <Box
            sx={{
                position: "absolute",
                backgroundColor: "blue",
                width: "20%",
                zIndex: 2,
            }}
        >
            <Box sx={{ zIndex: 3 }}>
                {configState && <Action config={configState} />}
            </Box>
        </Box>
    );
};
