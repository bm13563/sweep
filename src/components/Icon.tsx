import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CodeIcon from "@mui/icons-material/Code";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Box, SxProps, Theme } from "@mui/material";
import { utility, colors } from "../themes";

type IconOptions =
    | "add"
    | "code"
    | "info"
    | "visible"
    | "invisible"
    | "delete"
    | "close";

const Icons = {
    add: <AddIcon />,
    code: <CodeIcon />,
    info: <InfoIcon />,
    visible: <RemoveRedEyeIcon />,
    invisible: <VisibilityOffIcon />,
    delete: <DeleteIcon />,
    close: <CloseIcon />,
};

export const Icon = ({
    icon,
    onClick,
    alignRight = false,
}: {
    icon: IconOptions;
    onClick: () => void;
    alignRight?: boolean;
}): JSX.Element => {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "unset",
                ...utility.pointer,
                ...colors.text.default,
                ...(alignRight && { marginLeft: "auto" }),
            }}
        >
            {Icons[icon]}
        </Box>
    );
};
