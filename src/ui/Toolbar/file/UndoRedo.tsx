import { useToolbarState } from "@/hooks/useToolbarState";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { UndoRedoStateProps } from "@/hooks/useUndoRedoState";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import update from "immutability-helper";
import shallow from "zustand/shallow";

export const UndoRedo = (): JSX.Element => {
  const setUiLayers = useUiLayerState((state) => state.setUiLayers);

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

  const undo = () => {
    const newUiLayer = state.past[state.past.length - 1];
    setUiLayers(JSON.parse(newUiLayer));
    setToolbarState(
      "undoRedoState",
      JSON.stringify({
        present: newUiLayer,
        past: update(state.past, {
          $splice: [[state.past.length - 1, 1]],
        }),
        future: [...state.future, state.present],
      })
    );
  };

  const redo = () => {
    const newUiLayer = state.future[state.future.length - 1];
    setUiLayers(JSON.parse(newUiLayer));
    setToolbarState(
      "undoRedoState",
      JSON.stringify({
        present: newUiLayer,
        past: [...state.past, state.present],
        future: update(state.future, {
          $splice: [[state.future.length - 1, 1]],
        }),
      })
    );
  };

  return (
    <>
      <MenuItem active={state.past.length > 1} onClick={undo} name={"Undo"} />
      <MenuItem active={state.future.length > 0} onClick={redo} name={"Redo"} />
    </>
  );
};
