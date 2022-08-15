import { useUiLayerState } from "@/hooks/useUiLayerState";
import { MenuItemConfig } from "@/ui/Toolbar/Toolbar2";
import update from "immutability-helper";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

export const useUndoRedo = (): MenuItemConfig[] => {
  const { uiLayers, setUiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const pseudolayers = uiLayers.map(
    (uiLayer) => uiLayer.properties.pseudolayer
  );
  const hashedUiLayers = JSON.stringify(uiLayers);

  const [past, setPast] = useState<string[]>([]);
  const [present, setPresent] = useState<string>(hashedUiLayers);
  const [future, setFuture] = useState<string[]>([]);

  const undo = () => {
    const newUiLayer = past[past.length - 1];
    setUiLayers(JSON.parse(newUiLayer));
    setPast(
      update(past, {
        $splice: [[past.length - 1, 1]],
      })
    );
    setPresent(newUiLayer);
    setFuture((prevState) => {
      return [...prevState, present];
    });
  };

  const redo = () => {
    const newUiLayer = future[future.length - 1];
    setUiLayers(JSON.parse(newUiLayer));
    setFuture(
      update(future, {
        $splice: [[future.length - 1, 1]],
      })
    );
    setPresent(newUiLayer);
    setPast((prevState) => {
      return [...prevState, present];
    });
  };

  useEffect(() => {
    if (present === hashedUiLayers) {
      return;
    }
    setPresent(hashedUiLayers);
    setPast((prevState) => {
      return [...prevState, present];
    });
    setFuture([]);
  }, [JSON.stringify(pseudolayers)]);

  return [
    {
      name: "Undo",
      active: past.length > 0,
      onClick: () => undo(),
      onClose: () => undefined,
    },
    {
      name: "Redo",
      active: future.length > 0,
      onClick: () => redo(),
      onClose: () => undefined,
    },
  ];
};
