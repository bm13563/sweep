import React, { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ActionConfig } from "../actions/Action";
import { SelectChangeEvent } from "@mui/material";
import { useAction } from "../actions/ActionContext";
import TileLayer from "ol/layer/Tile";
import { Pseudolayer } from "../map/layers/pseudolayer";
import { XYZBaseLayer } from "../map/layers/xyzLayer";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { baseFragment } from "../../webgl/shaders/base.fragment";

export const AddLayer = ({
    addPseudolayer,
}: {
    addPseudolayer: (pseudolayer: Pseudolayer) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [layerType, setLayerType] = useState("xyz");
    const [url, setUrl] = useState("");

    const updateLayerType = (event: SelectChangeEvent<string>): void => {
        setLayerType(event.target.value);
    };

    const updateUrl = (event: ChangeEvent<HTMLInputElement>): void => {
        setUrl(event.target.value);
    };

    const onSubmit = () => {
        const defaultTileLayer = new XYZBaseLayer({
            source: {
                url: url,
            },
            zIndex: 0,
        });
        const pseudolayer = new Pseudolayer(
            { u_image: defaultTileLayer },
            {},
            { vertexShader: baseVertex, fragmentShader: baseFragment }
        );
        addPseudolayer(pseudolayer);
        setUrl("");
        setLayerType("xyz");
        setDisplayAction(false);
    };

    const onClose = () => {
        setDisplayAction(false);
    };

    const addAction = () => {
        setDisplayAction(true);
    };

    const config: ActionConfig = {
        title: "Add layer",
        onSubmit: onSubmit,
        onClose: onClose,
        sections: [
            {
                type: "dropdown",
                title: "Layer type",
                items: ["xyz"],
                value: layerType,
                onChange: updateLayerType,
            },
            {
                type: "input",
                title: "URL",
                value: url,
                onChange: updateUrl,
            },
        ],
    };
    useAction({ newConfig: config, displayAction: displayAction });

    return <AddIcon onClick={addAction} />;
};
