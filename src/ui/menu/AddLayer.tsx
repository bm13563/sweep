import React, { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ActionConfig } from "../actions/Action";
import { SelectChangeEvent } from "@mui/material";
import { useAction } from "../actions/ActionContext";

export const AddLayer = (): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [layerType, setLayerType] = useState("tile");
    const [url, setUrl] = useState("");

    const updateLayerType = (event: SelectChangeEvent<string>): void => {
        setLayerType(event.target.value);
    };

    const updateUrl = (event: ChangeEvent<HTMLInputElement>): void => {
        setUrl(event.target.value);
    };

    const onSubmit = () => {
        console.log(layerType, url);
    };

    const onClose = () => {
        setDisplayAction(false);
    };

    const addAction = () => {
        setDisplayAction(true);
    };

    const config: ActionConfig = {
        title: url,
        onSubmit: onSubmit,
        onClose: onClose,
        sections: [
            {
                type: "dropdown",
                title: "Layer type",
                items: ["tile"],
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
