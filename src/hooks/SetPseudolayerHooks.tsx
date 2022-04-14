import React from "react";
import { HandleUiLayerState } from "./HandleUiLayerState";
import { Pseudolayer } from "../ui/mapPanel/layers/pseudolayer";
import update from "immutability-helper";
import shallow from "zustand/shallow";

export const AddPendingLayerToActiveUiLayer = (
    pseudolayer: Pseudolayer,
    activeIndex: number
): void => {
    const { uiLayers, setUiLayers } = HandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );
    setUiLayers(
        update(uiLayers, {
            [activeIndex]: {
                pendingPseudolayer: {
                    $set: pseudolayer,
                },
            },
        })
    );
};

export const RemovePendingLayerFromActiveUiLayer = (
    activeIndex: number
): void => {
    const { uiLayers, setUiLayers } = HandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );
    setUiLayers(
        update(uiLayers, {
            [activeIndex]: {
                pendingPseudolayer: {
                    $set: undefined,
                },
            },
        })
    );
};

export const CommitPendingPseudolayerToActiveUiLayer = (
    pendingPseudolayer: Pseudolayer,
    activeIndex: number
): void => {
    const { uiLayers, setUiLayers } = HandleUiLayerState(
        (state) => ({
            uiLayers: state.uiLayers,
            setUiLayers: state.setUiLayers,
        }),
        shallow
    );
    setUiLayers(
        update(uiLayers, {
            [activeIndex]: {
                config: {
                    pseudolayer: {
                        $set: pendingPseudolayer,
                    },
                },
                pendingPseudolayer: {
                    $set: undefined,
                },
            },
        })
    );
};
