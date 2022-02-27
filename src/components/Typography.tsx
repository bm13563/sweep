import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { colors } from "../themes";

export const Header1 = ({
    children,
}: {
    children?: ReactNode;
}): JSX.Element => {
    return (
        <Typography variant="h4" color={colors.text.default.color}>
            {children}
        </Typography>
    );
};

export const Body1 = ({ children }: { children?: ReactNode }): JSX.Element => {
    return (
        <Typography variant="body1" color={colors.text.default.color}>
            {children}
        </Typography>
    );
};

export const Body2 = ({ children }: { children?: ReactNode }): JSX.Element => {
    return (
        <Typography variant="caption" color={colors.text.default.color}>
            {children}
        </Typography>
    );
};
