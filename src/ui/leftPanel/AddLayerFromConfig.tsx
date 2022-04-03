import React, { ChangeEvent, useState } from "react";
import { ActionConfig } from "../actionPanel/Action";
import { useAction } from "../actionPanel/ActionContext";
import { generateUiLayer, UiLayer } from "../uiLayer";
import update from "immutability-helper";
import { uiLayerResolver } from "../../resolvers";
import { Icon } from "../../components/Icon";

export const AddLayerFromConfig = ({
    uiLayers,
    updateUiLayers,
}: {
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
}): JSX.Element => {
    const [displayAction, setDisplayAction] = useState(false);
    const [layerName, setLayerName] = useState("");
    const [json, setJson] = useState("");
    const [validationError, setValidationError] = useState("");

    const addLayerFromConfig = (name: string, json: string) => {
        const parsedLayer = JSON.parse(json);
        const newUiLayer = generateUiLayer({
            name: name,
            pseudolayer: parsedLayer.config.pseudolayer,
        });
        updateUiLayers(
            update(uiLayers, {
                $unshift: [newUiLayer],
            })
        );
    };

    const updateLayerName = (value: string): void => {
        setLayerName(value);
    };

    const onSubmit = () => {
        addLayerFromConfig(layerName, json);
        setJson("");
        setLayerName("");
        setDisplayAction(false);
        setValidationError("");
    };

    const onClose = () => {
        setDisplayAction(false);
        setJson("");
        setLayerName("");
        setDisplayAction(false);
        setValidationError("");
    };

    const updateJson = (value: string) => {
        setJson(value);
        try {
            const { success } = uiLayerResolver.safeParse(JSON.parse(value));
            success
                ? setValidationError("")
                : setValidationError("JSON is not a valid pseudolayer");
        } catch (e) {
            value === ""
                ? setValidationError("")
                : setValidationError("Please submit valid JSON");
        }
    };

    const config: ActionConfig = {
        title: "Export",
        onClose: onClose,
        onSubmit: onSubmit,
        errors: validationError === "" ? undefined : [validationError],
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

    return (
        <Icon
            className="i-mdi-code-braces"
            onClick={() => setDisplayAction(true)}
        />
    );
};
