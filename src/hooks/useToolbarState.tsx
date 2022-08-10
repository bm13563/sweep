import create from "zustand";

// potentially best usage pattern would be to nest this
// within useUiLayerState?

interface ToolbarStateProps {
  undoRedoState: string;
  setToolbarState: (
    key: keyof Omit<ToolbarStateProps, "setToolbarState">,
    newState: string
  ) => void;
}

export const useToolbarState = create<ToolbarStateProps>((set) => ({
  undoRedoState: "",
  setToolbarState: (
    key: keyof Omit<ToolbarStateProps, "setToolbarState">,
    newState: string
  ) => {
    return set(() => ({ [key]: newState }));
  },
}));
