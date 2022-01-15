import React, { useContext, useState } from "react";
import { RenderLoopContext } from "../App";
import { Grid } from "@mui/material";
import { LayerContainer } from "./menu/LayerContainer";
import { Pseudolayer } from "./map/layers/pseudolayer";
import { MapContainer } from "./map/MapContainer";
import { Canvas } from "./map/Canvas";
import { ActionContainer } from "./actions/ActionContainer";
import { defaultView } from "../utils/utils";
import { ActionStateProvider } from "./actions/ActionContext";

const view = defaultView();

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [pseudolayer, setPseudolayer] = useState<Pseudolayer>();

    renderLoop.renderPseudolayer(pseudolayer);

    const setPseudolayerCallback = (pseudolayer: Pseudolayer | undefined) => {
        setPseudolayer(pseudolayer);
    };

    return (
        <ActionStateProvider>
            <Grid
                container
                spacing={0}
                sx={{
                    height: "calc(100vh - 16px)",
                    margin: "0px",
                    alignContent: "flex-start",
                }}
            >
                <Grid item xs={12} sx={{ height: "10%" }}>
                    hi
                </Grid>
                <Grid item xs={2} sx={{ height: "90%" }}>
                    <LayerContainer setPseudolayer={setPseudolayerCallback} />
                </Grid>
                <Grid
                    item
                    xs={10}
                    sx={{
                        height: "90%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActionContainer />
                    <MapContainer view={view} pseudolayer={pseudolayer} />
                    <Canvas />
                </Grid>
            </Grid>
        </ActionStateProvider>
    );
};
