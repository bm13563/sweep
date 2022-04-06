import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { UiLayer } from "../uiLayer";
import { useAction } from "../actionPanel/ActionContext";
import { ActionConfig } from "../actionPanel/Action";
import update from "immutability-helper";
import { Icon } from "../../components/Icon";
import { Body1 } from "../../components/Typography";
import { HorizontalStack } from "../../components/HorizontalStack";
import { GetActiveUiLayer } from "../../hooks/GetActiveUiLayer";

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Layer = ({
    uiLayer,
    uiLayers,
    updateUiLayers,
    index,
}: {
    uiLayer: UiLayer;
    uiLayers: UiLayer[];
    updateUiLayers: (uiLayer: UiLayer[]) => void;
    index: number;
}): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const layerId = uiLayer.uid;

    const { activeUiLayer } = GetActiveUiLayer(uiLayers);

    const [displayAction, setDisplayAction] = useState(false);
    const [json, setJson] = useState("");

    const remove = (uiLayer: UiLayer) => {
        const indexToRemove = uiLayers.indexOf(uiLayer);
        updateUiLayers(
            update(uiLayers, {
                $splice: [[indexToRemove, 1]],
            })
        );
    };

    const updateVisibility = (uiLayer: UiLayer) => {
        const indexToUpdate = uiLayers.indexOf(uiLayer);
        updateUiLayers(
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
            updateUiLayers(
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
        setDisplayAction(true);
    };

    const onClose = () => {
        setDisplayAction(false);
    };

    const updateJson = (value: string) => {
        setJson(value);
    };

    const config: ActionConfig = {
        title: "Export",
        onClose: onClose,
        sections: [
            {
                type: "textField",
                title: "Pseudolayer",
                defaultValue: json,
                onChange: updateJson,
            },
        ],
    };
    useAction({ newConfig: config, displayAction: displayAction });

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
