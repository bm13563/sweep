import React, { useContext, useState } from "react";
import View from "ol/View";
import { RenderLoopContext } from "../App";
import { Box, Grid } from "@mui/material";
import { LayerContainer } from "./menu/LayerContainer";
import { Pseudolayer } from "./map/layers/pseudolayer";
import { fromLonLat } from "ol/proj";
import { MapContainer } from "./map/MapContainer";
import { Canvas } from "./map/Canvas";
import { ActionContainer } from "./actions/ActionContainer";

const view = new View({
    zoom: 9,
    center: fromLonLat([-94.9065, 38.9884]),
});

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [pseudolayer, setPseudolayer] = useState<Pseudolayer>();
    const [action, setAction] = useState<JSX.Element>();

    renderLoop.renderPseudolayer(pseudolayer);

    const setPseudolayerCallback = (pseudolayer: Pseudolayer | undefined) => {
        setPseudolayer(pseudolayer);
    };

    const setActionCallback = (component: JSX.Element) => {
        setAction(component);
    };

    return (
        <>
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
                    <LayerContainer
                        setPseudolayer={setPseudolayerCallback}
                        setAction={setActionCallback}
                    />
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
                    {action && <ActionContainer action={action} />}
                    <MapContainer view={view} pseudolayer={pseudolayer} />
                    <Canvas />
                </Grid>
            </Grid>
        </>
    );
};
