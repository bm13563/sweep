import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { UiLayer } from "../uiLayer";
import { Icon } from "../../components/Icon";
import { Body1, Header1 } from "../../components/Typography";
import { HorizontalStack } from "../../components/HorizontalStack";
import { GetActiveUiLayer } from "../../hooks/GetActiveUiLayer";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TextField } from "../../components/TextField";
import { VerticalStack } from "../../components/VerticalStack";
import { HandleUiState } from "../../hooks/HandleUiState";
import update from "immutability-helper";
import shallow from "zustand/shallow";
import { HandleUiLayerState } from "../../hooks/HandleUiLayerState";

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Layer = ({
    uiLayer,
    uiLayers,
    index,
}: {
    uiLayer: UiLayer;
    uiLayers: UiLayer[];
    index: number;
}): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const textFieldRef = useRef<HTMLDivElement>(null);
    const layerId = uiLayer.uid;

    const [displayUi, setDisplayUi] = useState(false);
    const [json, setJson] = useState("");
    const { bindUi, unbindUi } = HandleUiState(
        (state) => ({
            bindUi: state.bindUi,
            unbindUi: state.unbindUi,
        }),
        shallow
    );
    const setUiLayers = HandleUiLayerState((state) => state.setUiLayers);

    const { activeUiLayer } = GetActiveUiLayer(uiLayers);

    const remove = (uiLayer: UiLayer) => {
        const indexToRemove = uiLayers.indexOf(uiLayer);
        setUiLayers(
            update(uiLayers, {
                $splice: [[indexToRemove, 1]],
            })
        );
    };

    const updateVisibility = (uiLayer: UiLayer) => {
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

    const move = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            if (uiLayers.length === 1) return;
            const dragCard = uiLayers[dragIndex];
            setUiLayers(
                update(uiLayers, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                })
            );
        },
        [uiLayers]
    );

    const [{ handlerId }, drop] = useDrop({
        accept: "layer",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            move(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "layer",
        item: () => {
            return { layerId, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const changeVisibility = () => {
        updateVisibility(uiLayer);
    };

    const removeUiLayer = () => {
        remove(uiLayer);
    };

    drag(drop(ref));

    const exportLayerInfo = () => {
        const layerJson = JSON.stringify(uiLayer);
        setJson(layerJson);
        setDisplayUi(true);
    };

    const copy = () => {
        navigator.clipboard.writeText(json);
        textFieldRef.current && textFieldRef.current.click();
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
                    ref={textFieldRef}
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

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            className={`flex flex-col justify-center h-10 bg-emerald-300 cursor-pointer ${
                isDragging && "opacity-0"
            } ${
                uiLayer.uid === activeUiLayer?.uid
                    ? "border border-orange-300"
                    : "border"
            }`}
        >
            <HorizontalStack spacing={5} className="justify-between">
                <Body1>{uiLayer.config.name}</Body1>
                <HorizontalStack spacing={2}>
                    <Icon
                        className="i-mdi-code-braces"
                        onClick={exportLayerInfo}
                    />
                    <Icon className="i-mdi-delete" onClick={removeUiLayer} />
                    {uiLayer.visible ? (
                        <Icon
                            className="i-mdi-eye-off"
                            onClick={changeVisibility}
                        />
                    ) : (
                        <Icon
                            className="i-mdi-eye"
                            onClick={changeVisibility}
                        />
                    )}
                </HorizontalStack>
            </HorizontalStack>
        </div>
    );
};
