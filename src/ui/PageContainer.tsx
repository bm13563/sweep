import React, { useContext, useState } from "react";
import View from "ol/View";
import { PositionedCanvas, PositionedMap } from "./position.styles";
import { RenderLoopContext } from "../App";
import { Grid } from "@mui/material";
import { LayerPanel } from "./menu/LayerPanel";
import { Pseudolayer } from "./map/layers/pseudolayer";
import { fromLonLat } from "ol/proj";

const view = new View({
    zoom: 9,
    center: fromLonLat([-94.9065, 38.9884]),
});

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [pseudolayer, setPseudolayer] = useState<Pseudolayer>();

    renderLoop.renderPseudolayer(pseudolayer);

    const setActive = (pseudolayer: Pseudolayer | undefined) => {
        setPseudolayer(pseudolayer);
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
                    <LayerPanel setActive={setActive} />
                </Grid>
                <Grid item xs={10} sx={{ height: "90%", display: "grid" }}>
                    {pseudolayer && (
                        <PositionedMap view={view} pseudolayer={pseudolayer} />
                    )}
                    <PositionedCanvas />
                </Grid>
            </Grid>
        </>
    );
};
