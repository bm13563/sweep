import { XYCoord } from "dnd-core";
import update from "immutability-helper";
import React, { useCallback, useRef, useState } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import shallow from "zustand/shallow";
import { HorizontalStack } from "../../components/HorizontalStack";
import { TextField } from "../../components/TextField";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import { UiLayer } from "../../primitives/uiLayer";
import { DeleteLayer } from "./DeleteLayer";
import { ExportLayer } from "./ExportLayer";
import { LayerMetadata } from "./LayerMetadata";
import { RenameLayer } from "./RenameLayer";
import { ToggleLayer } from "./ToggleLayer";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Layer = ({
  uiLayer,
  index,
}: {
  uiLayer: UiLayer;
  index: number;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const layerId = uiLayer.uid;

  const [editMode, setEditMode] = useState(false);

  const { uiLayers, activeUiLayer, setUiLayers } = useHandleUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      activeUiLayer: state.activeUiLayer,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateLayerName = (newName: string) => {
    setUiLayers(
      update(uiLayers, { [index]: { properties: { name: { $set: newName } } } })
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`flex flex-col justify-center h-8 bg-blues-items-primary cursor-pointer ${
        isDragging && "opacity-0"
      } ${uiLayer.uid === activeUiLayer?.uid && "border border-blues-border-accent"}`}
    >
      <HorizontalStack className="justify-between">
        <TextField
          value={uiLayer.properties.name}
          className={`children:border-none ${
            editMode && "cursor-text bg-blues-items-accent"
          }`}
          editable={editMode}
          onChange={updateLayerName}
        />
        <HorizontalStack spacing={0.5}>
          <RenameLayer toggleEditMode={toggleEditMode} />
          <LayerMetadata uiLayer={uiLayer} index={index} />
          <ExportLayer uiLayer={uiLayer} />
          <DeleteLayer uiLayer={uiLayer} />
          <ToggleLayer uiLayer={uiLayer} />
        </HorizontalStack>
      </HorizontalStack>
    </div>
  );
};
