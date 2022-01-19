import { Box, Stack } from "@mui/material";
import React from "react";
import { ToolbarMenu } from "./ToolbarMenu";
import { ToolbarMenuItem } from "./ToolbarMenuItem";

export const ToolbarContainer = (): JSX.Element => {
    return (
        <Box
            sx={{
                backgroundColor: "purple",
                height: "100%",
                paddingLeft: "15.625rem",
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <ToolbarMenu name="Menu 1">
                    <ToolbarMenuItem />
                    <ToolbarMenuItem />
                    <ToolbarMenuItem />
                </ToolbarMenu>
            </Stack>
        </Box>
    );
};
