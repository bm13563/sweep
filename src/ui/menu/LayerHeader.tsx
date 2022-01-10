import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddLayer = ({ text }: { text: string }) => {
    return <Box>{text}</Box>;
};

export const LayerHeader = ({
    setAction,
}: {
    setAction: (component: JSX.Element) => void;
}): JSX.Element => {
    const addAction = () => {
        setAction(AddLayer({ text: "HELLO" }));
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
                <AddIcon
                    sx={{ marginLeft: "auto", bottom: "0px" }}
                    onClick={addAction}
                />
            </Stack>
        </Box>
    );
};
