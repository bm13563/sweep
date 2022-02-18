import React, { ChangeEvent, useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import { ActionConfig } from "../actionPanel/Action";
import { useAction } from "../actionPanel/ActionContext";

export const AddLayerFromConfig = ({
    addLayerFromConfig,
}: {
    addLayerFromConfig: (name: string, json: string) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [layerName, setLayerName] = useState("");
    const [json, setJson] = useState("");

    const updateLayerName = (event: ChangeEvent<HTMLInputElement>): void => {
        setLayerName(event.target.value);
    };

    const onSubmit = () => {
        addLayerFromConfig(layerName, json);
        setJson("");
        setLayerName("");
        setDisplayAction(false);
    };

    const onClose = () => {
        setDisplayAction(false);
    };

    const updateJson = (event: ChangeEvent<HTMLInputElement>) => {
        setJson(event.target.value);
    };

    const config: ActionConfig = {
        title: "Export",
        onClose: onClose,
        onSubmit: onSubmit,
        sections: [
            {
                type: "input",
                title: "Name",
                value: layerName,
                onChange: updateLayerName,
            },
            {
                type: "textField",
                title: "Pseudolayer",
                value: json,
                onChange: updateJson,
            },
        ],
    };
    useAction({ newConfig: config, displayAction: displayAction });

    return <CodeIcon onClick={() => setDisplayAction(true)} />;
};
