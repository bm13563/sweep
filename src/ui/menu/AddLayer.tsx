import React, { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ActionConfig } from "../actions/Action";
import { SelectChangeEvent } from "@mui/material";
import { useAction } from "../actions/ActionContext";
import { LayerProps, LayerTypes } from "../map/layers/layer";

export interface AddLayerProps {
    name: string;
    type: string;
    source: LayerProps;
}

export const AddLayer = ({
    addUiLayer,
}: {
    addUiLayer: (addLayerProps: AddLayerProps) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("xyz");
    const [url, setUrl] = useState("");

    const updateName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const updateLayerType = (event: SelectChangeEvent<string>): void => {
        setType(event.target.value);
    };

    const updateUrl = (event: ChangeEvent<HTMLInputElement>): void => {
        setUrl(event.target.value);
    };

    const onSubmit = () => {
        //https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
        //https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png
        addUiLayer({
            name: name,
            type: type,
            source: { source: { url: url } },
        });
        setUrl("");
        setType("xyz");
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
                type: "input",
                title: "Name",
                value: name,
                onChange: updateName,
            },
            {
                type: "dropdown",
                title: "Layer type",
                items: Object.values(LayerTypes),
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

    return <AddIcon onClick={addAction} />;
};
