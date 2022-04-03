import React, { ChangeEvent, useState } from "react";
import { ActionConfig } from "../actionPanel/Action";
import { SelectChangeEvent } from "@mui/material";
import { useAction } from "../actionPanel/ActionContext";
import { baseFragment } from "../../webgl/shaders/base.fragment";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { generateLayer } from "../mapPanel/layers/layer";
import { generatePseudolayer } from "../mapPanel/layers/pseudolayer";
import { generateUiLayer, UiLayer } from "../uiLayer";
import update from "immutability-helper";
import { Icon } from "../../components/Icon";

export interface AddLayerProps {
    name: string;
    type: "XYZ";
    url: string;
}

export const AddLayer = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("XYZ");
    const [url, setUrl] = useState("");

    const addUiLayer = ({ name, type, url }: AddLayerProps) => {
        const layer = generateLayer({ type: type, url: url });
        const pseudolayer = generatePseudolayer({
            inputs: { u_image: layer },
            variables: {},
            shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
        });
        const uiLayer = generateUiLayer({
            name: name,
            pseudolayer: pseudolayer,
        });
        updateUiLayers(
            update(uiLayers, {
                $unshift: [uiLayer],
            })
        );
    };

    const updateLayerType = (value: string): void => {
        setType(value);
    };

    const updateName = (value: string): void => {
        setName(value);
    };

    const updateUrl = (value: string): void => {
        setUrl(value);
    };

    const onSubmit = () => {
        //https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
        //https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png
        addUiLayer({
            name: name,
            type: "XYZ",
            url: url,
        });
        setName("");
        setUrl("");
        setType("XYZ");
        setDisplayAction(false);
    };

    const onClose = () => {
        setDisplayAction(false);
        setName("");
        setUrl("");
        setType("XYZ");
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
                type: "input",
                title: "Name",
                value: name,
                onChange: updateName,
            },
            {
                type: "dropdown",
                title: "Layer type",
                items: ["XYZ"],
                value: type,
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

    return <Icon className="i-mdi-add" onClick={addAction} />;
};
