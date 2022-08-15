import { useToolbarState } from "@/hooks/useToolbarState";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { useEffect } from "react";
import shallow from "zustand/shallow";

export interface UndoRedoStateProps {
  present: string;
  past: string[];
  future: string[];
}

export const useUndoRedoState = () => {
  const uiLayers = useUiLayerState((state) => state.uiLayers);

  const pseudolayers = JSON.stringify(
    uiLayers.map((uiLayer) => uiLayer.properties.pseudolayer)
  );
  const hashedUiLayers = JSON.stringify(uiLayers);

  const { undoRedoState, setToolbarState } = useToolbarState(
    (state) => ({
      undoRedoState: state.undoRedoState,
      setToolbarState: state.setToolbarState,
    }),
    shallow
  );

  let state: UndoRedoStateProps;
  try {
    state = JSON.parse(undoRedoState) as UndoRedoStateProps;
  } catch (error) {
    state = { present: "", past: [], future: [] };
  }

  useEffect(() => {
    if (state.present === hashedUiLayers) {
      return;
    }

    const newState = {
      past: [...state.past, state.present],
      present: hashedUiLayers,
      future: [],
    };

    setToolbarState("undoRedoState", JSON.stringify(newState));
  }, [pseudolayers]);
};
