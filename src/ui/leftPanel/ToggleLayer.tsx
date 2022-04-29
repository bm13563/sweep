import React from "react";
import { Icon } from "../../components/Icon";
import { UiLayer } from "../uiLayer";
import shallow from "zustand/shallow";
import { HandleUiLayerState } from "../../hooks/HandleUiLayerState";
import update from "immutability-helper";

export const ToggleLayer = ({ uiLayer }: { uiLayer: UiLayer }): JSX.Element => {
    const { uiLayers, setUiLayers } = HandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );

    const updateVisibility = () => {
        const indexToUpdate = uiLayers.indexOf(uiLayer);
        setUiLayers(
            update(uiLayers, {
                [indexToUpdate]: {
                    visible: {
                        $apply: function (visible) {
                            return !visible;
                        },
                    },
                },
            })
        );
    };

    return (
        <>
            {uiLayer.visible ? (
                <Icon className="i-mdi-eye-off" onClick={updateVisibility} />
            ) : (
                <Icon className="i-mdi-eye" onClick={updateVisibility} />
            )}
        </>
    );
};
