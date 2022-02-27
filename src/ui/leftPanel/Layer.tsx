import { Box, Stack, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { getActiveUiLayer, UiLayer } from "../uiLayer";
import { useAction } from "../actionPanel/ActionContext";
import { ActionConfig } from "../actionPanel/Action";
import update from "immutability-helper";
import { Icon } from "../../components/Icon";
import { RightAlignedStack } from "../../components/RightAlignedStack";
import { Body1 } from "../../components/Typography";

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

    const { activeUiLayer } = getActiveUiLayer(uiLayers);

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

    const updateJson = (event: ChangeEvent<HTMLInputElement>) => {
        setJson(event.target.value);
    };

    const config: ActionConfig = {
        title: "Export",
        onClose: onClose,
        sections: [
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
        <Box
            ref={ref}
            data-handler-id={handlerId}
            sx={{
                height: "5%",
                backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: isDragging ? 0 : 1,
                outline:
                    uiLayer.uid === activeUiLayer?.uid
                        ? "2px solid yellow"
                        : "none",
            }}
        >
            <Stack direction="row">
                <Box>
                    <Body1>{uiLayer.config.name}</Body1>
                </Box>
                <RightAlignedStack spacing={1}>
                    <Icon icon={"info"} onClick={exportLayerInfo} />
                    <Icon icon={"delete"} onClick={removeUiLayer} />
                    {uiLayer.visible ? (
                        <Icon icon={"invisible"} onClick={changeVisibility} />
                    ) : (
                        <Icon icon={"visible"} onClick={changeVisibility} />
                    )}
                </RightAlignedStack>
            </Stack>
        </Box>
    );
};
