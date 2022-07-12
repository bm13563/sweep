import React, { useCallback, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { UiLayer } from "../../primitives/uiLayer";
import { HorizontalStack } from "../../components/HorizontalStack";
import update from "immutability-helper";
import shallow from "zustand/shallow";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";
import { DeleteLayer } from "./DeleteLayer";
import { ToggleLayer } from "./ToggleLayer";
import { ExportLayer } from "./ExportLayer";
import { RenameLayer } from "./RenameLayer";
import { TextField } from "../../components/TextField";

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
      className={`flex flex-col justify-center h-10 bg-emerald-300 cursor-pointer ${
        isDragging && "opacity-0"
      } ${
        uiLayer.uid === activeUiLayer?.uid
          ? "border border-orange-300"
          : "border"
      }`}
    >
      <HorizontalStack spacing={5} className="justify-between">
        <TextField
          value={uiLayer.properties.name}
          className={`children:border-none ${
            editMode && "cursor-text bg-blue"
          }`}
          editable={editMode}
          onChange={updateLayerName}
        />
        <HorizontalStack spacing={1}>
          <RenameLayer toggleEditMode={toggleEditMode} />
          <ExportLayer uiLayer={uiLayer} />
          <DeleteLayer uiLayer={uiLayer} />
          <ToggleLayer uiLayer={uiLayer} />
        </HorizontalStack>
      </HorizontalStack>
    </div>
  );
};
