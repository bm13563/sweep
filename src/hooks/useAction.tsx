import create from "zustand";

type ActionProps = {
  sideAction: (() => JSX.Element) | undefined;
  setSideAction: (sideAction: (() => JSX.Element) | undefined) => void;
  centreAction: (() => JSX.Element) | undefined;
  setCentreAction: (centreAction: (() => JSX.Element) | undefined) => void;
};

export const useAction = create<ActionProps>((set) => ({
  sideAction: undefined,
  setSideAction: (sideAction) => {
    set(() => ({
      sideAction,
      centreAction: undefined
    }))
  },
  centreAction: undefined,
  setCentreAction: () => {
    set(() => ({sideAction: undefined}))
  },
}));
