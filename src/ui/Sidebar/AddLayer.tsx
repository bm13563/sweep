import React, { useEffect, useState } from "react";
import { baseFragment } from "../../webgl/shaders/base.fragment";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { generateLayer } from "../../primitives/baseLayer";
import { generatePseudoLayer } from "../../primitives/pseudoLayer";
import { generateUiLayer } from "../../primitives/uiLayer";
import { Icon } from "../../components/Icon";
import { HorizontalStack } from "../../components/HorizontalStack";
import { Body1, Header1 } from "../../components/Typography";
import { VerticalStack } from "../../components/VerticalStack";
import { useHandleUiState } from "../../hooks/useHandleUiState";
import { TextField } from "../../components/TextField";
import { Dropdown } from "../../components/Dropdown";
import { PrimaryButton } from "../../components/PrimaryButton";
import update from "immutability-helper";
import shallow from "zustand/shallow";
import { SecondaryButton } from "../../components/SecondaryButton";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";

export interface AddLayerProps {
    name: string;
    type: "XYZ";
    url: string;
}

export const AddLayer = (): JSX.Element => {
    const [name, setName] = useState("");
    const [type, setType] = useState("XYZ");
    const [url, setUrl] = useState("");
    const [displayUi, setDisplayUi] = useState(false);
    const { bindUi, unbindUi } = useHandleUiState(
        (state) => ({
            bindUi: state.bindUi,
            unbindUi: state.unbindUi,
        }),
        shallow
    );
    const { uiLayers, setUiLayers } = useHandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );

    const allowSubmit = !!(name != "" && type != "" && url != "");

    const clearFields = () => {
        setName("");
        setUrl("");
        setType("XYZ");
    };

    const addUiLayer = ({ name, type, url }: AddLayerProps) => {
        const layer = generateLayer({ type: type, url: url });
        const pseudolayer = generatePseudoLayer({
            inputs: { u_image: layer },
            variables: {},
            dynamics: {},
            shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
        });
        const uiLayer = generateUiLayer({
            name: name,
            pseudolayer: pseudolayer,
        });
        setUiLayers(
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
        clearFields();
        unbindUi();
        setDisplayUi(false);
    };

    const onClose = () => {
        clearFields();
        unbindUi();
        setDisplayUi(false);
    };

    useEffect(() => {
        displayUi && bindUi(AddLayerUi());
    }, [displayUi, allowSubmit, name, type, url]);

    const AddLayerUi = (): JSX.Element => {
        return (
            <VerticalStack spacing={2}>
                <HorizontalStack className="justify-between mb-1">
                    <Header1>Add Layer</Header1>
                    <Icon className="i-mdi-close" onClick={onClose} />
                </HorizontalStack>
                <Body1>Name</Body1>
                <TextField value={name} onChange={updateName} />
                <Body1>Type</Body1>
                <Dropdown options={["XYZ"]} onChange={updateLayerType} />
                <Body1>URL</Body1>
                <TextField value={url} onChange={updateUrl} />
                <HorizontalStack
                    spacing={5}
                    className="items-center justify-around children:w-25"
                >
                    <PrimaryButton
                        text="Apply"
                        onClick={onSubmit}
                        active={allowSubmit}
                    />
                    <SecondaryButton text="Clear" onClick={clearFields} />
                </HorizontalStack>
            </VerticalStack>
        );
    };

    return <Icon className="i-mdi-add" onClick={() => setDisplayUi(true)} />;
};
