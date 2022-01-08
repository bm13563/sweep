import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { isConstructorDeclaration } from "typescript";
import { flippedPseudolayer } from "../../utils/utils";
import { Pseudolayer } from "../map/layers/pseudolayer";

interface NamedPseudolayers {
    name: string;
    pseudolayer: Pseudolayer;
}

export const LayerPanel = ({
    pseudolayer,
    setActive,
}: {
    pseudolayer: Pseudolayer;
    setActive: (pseudolayer: Pseudolayer) => void;
}): JSX.Element => {
    const [namedPseudolayers, setNamedPseudolayers] = useState<
        NamedPseudolayers[]
    >([{ name: "OSM Road", pseudolayer: pseudolayer }]);

    const addPseudolayer = () => {
        setNamedPseudolayers((lastPseudolayer: NamedPseudolayers[]) => {
            return [
                ...lastPseudolayer,
                {
                    name: "Flipped OSM Road",
                    pseudolayer: flippedPseudolayer(),
                },
            ];
        });
    };

    const setActivePseudolayer = (pseudolayer: Pseudolayer) => {
        setActive(pseudolayer);
    };

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "red",
                    height: "100%",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h4">Layers</Typography>
                    {namedPseudolayers.map((namedPseudolayer) => {
                        return (
                            <Typography
                                key={namedPseudolayer.pseudolayer.uid}
                                variant="body2"
                                onClick={() =>
                                    setActivePseudolayer(
                                        namedPseudolayer.pseudolayer
                                    )
                                }
                            >
                                {namedPseudolayer.name}
                            </Typography>
                        );
                    })}
                    <Button onClick={addPseudolayer}>Add pseudolayer</Button>
                </Stack>
            </Container>
        </>
    );
};
