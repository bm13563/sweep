import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../../components/Icon";
import { UiLayer } from "../uiLayer";
import shallow from "zustand/shallow";
import { HorizontalStack } from "../../components/HorizontalStack";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TextField } from "../../components/TextField";
import { Header1, Body1 } from "../../components/Typography";
import { VerticalStack } from "../../components/VerticalStack";
import { HandleUiState } from "../../hooks/HandleUiState";

export const ExportLayer = ({ uiLayer }: { uiLayer: UiLayer }): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);

    const [displayUi, setDisplayUi] = useState(false);
    const [json, setJson] = useState("");
    const { bindUi, unbindUi } = HandleUiState(
        (state) => ({
            bindUi: state.bindUi,
            unbindUi: state.unbindUi,
        }),
        shallow
    );

    const exportLayerInfo = () => {
        const layerJson = JSON.stringify(uiLayer);
        setJson(layerJson);
        setDisplayUi(true);
    };

    const copy = () => {
        navigator.clipboard.writeText(json);
        ref.current && ref.current.click();
    };

    const onClose = () => {
        unbindUi();
        setDisplayUi(false);
    };

    const updateJson = (value: string) => {
        setJson(value);
    };

    useEffect(() => {
        displayUi && bindUi(LayerUi());
    }, [displayUi, json]);

    const LayerUi = (): JSX.Element => {
        return (
            <VerticalStack spacing={2}>
                <HorizontalStack className="justify-between mb-1">
                    <Header1>Export Layer</Header1>
                    <Icon className="i-mdi-close" onClick={onClose} />
                </HorizontalStack>
                <Body1>Name</Body1>
                <div
                    ref={ref}
                    onClick={(event) => {
                        const selection = window && window.getSelection();

                        selection !== null &&
                            selection.selectAllChildren(event.target as Node);
                    }}
                >
                    <TextField lines={6} value={json} onChange={updateJson} />
                </div>
                <div className="flex flex-col justify-center items-center children:w-25">
                    <PrimaryButton text="Copy" onClick={copy} />
                </div>
            </VerticalStack>
        );
    };

    return <Icon className="i-mdi-code-braces" onClick={exportLayerInfo} />;
};
