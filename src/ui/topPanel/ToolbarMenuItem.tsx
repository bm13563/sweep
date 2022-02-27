import { Box, Typography } from "@mui/material";
import React from "react";
import { Body2 } from "../../components/Typography";
import { colors, spacing } from "../../themes";

export const ToolbarMenuItem = ({
    onClick,
    name,
    active,
}: {
    onClick: () => void;
    name: string;
    active: boolean;
}): JSX.Element => {
    return (
        <Box
            onClick={active ? onClick : undefined}
            sx={{
                height: "100%",
                width: "100%",
                padding: spacing.spacing2,
                ...(active
                    ? colors.secondaryComponent.default
                    : colors.secondaryComponent.disabled),
                ...(active && colors.secondaryComponent.hover),
            }}
        >
            <Body2>{name}</Body2>
        </Box>
    );
};
