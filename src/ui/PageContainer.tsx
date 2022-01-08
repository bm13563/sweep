import React, { useContext, useState } from "react";
import { PositionedMap } from "./position.styles";
import { RenderLoopContext } from "../App";
import { defaultPseudolayer } from "../utils/utils";
import { Grid } from "@mui/material";
import { LayerPanel } from "./menu/LayerPanel";
import { Pseudolayer } from "./map/layers/pseudolayer";

export const PageContainer = (): JSX.Element => {
    const renderLoop = useContext(RenderLoopContext);

    const [pseudolayer, setPseudolayer] = useState(defaultPseudolayer());

    renderLoop.renderPseudolayer(pseudolayer);

    const setActive = (pseudolayer: Pseudolayer) => {
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
                    <LayerPanel
                        pseudolayer={pseudolayer}
                        setActive={setActive}
                    />
                </Grid>
                <Grid item xs={10} sx={{ height: "90%" }}>
                    <PositionedMap pseudolayer={pseudolayer} />
                </Grid>
            </Grid>
        </>
    );
};
