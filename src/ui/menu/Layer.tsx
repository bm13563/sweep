import { Box, Stack } from "@mui/material";
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { UiLayer } from "./LayerContainer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { XYCoord } from "dnd-core";

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const Layer = ({
    uiLayer,
    index,
    updateVisibility,
    remove,
    move,
}: {
    uiLayer: UiLayer;
    index: number;
    updateVisibility: (uiLayer: UiLayer) => void;
    remove: (uiLayer: UiLayer) => void;
    move: (dragIndex: number, hoverIndex: number) => void;
}): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const layerId = uiLayer.uid;

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

    return (
        <Box
            ref={ref}
            data-handler-id={handlerId}
            sx={{
                width: "90%",
                height: "5%",
                backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: isDragging ? 0 : 1,
            }}
        >
            <Stack direction="row">
                <Box>{uiLayer.name}</Box>
                <Stack direction="row" spacing={1} sx={{ marginLeft: "auto" }}>
                    <DeleteIcon onClick={removeUiLayer} />
                    {uiLayer.visible ? (
                        <VisibilityOffIcon onClick={changeVisibility} />
                    ) : (
                        <RemoveRedEyeIcon onClick={changeVisibility} />
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};
