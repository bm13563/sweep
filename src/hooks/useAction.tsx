import create from "zustand";

interface ActionProps {
  sidebarAction: JSX.Element | undefined;
  bindSidebarAction: (sidebarAction: JSX.Element) => void;
  unbindSidebarAction: () => void;
  centreAction: JSX.Element | undefined;
  bindCentreAction: (centreAction: JSX.Element) => void;
  unbindCentreAction: () => void;
  unbindAllActions: () => void;
}

export const useAction = create<ActionProps>((set) => ({
  sidebarAction: undefined,
  bindSidebarAction: (sidebarAction: JSX.Element) => {
    set(() => ({
      centreAction: undefined,
    }));
    set(() => ({ sidebarAction }));
  },
  unbindSidebarAction: () => set({ sidebarAction: undefined }),
  centreAction: undefined,
  bindCentreAction: (centreAction: JSX.Element) => {
    set(() => ({
      sidebarAction: undefined,
    }));
    set(() => ({ centreAction }));
  },
  unbindCentreAction: () => set({ centreAction: undefined }),
  unbindAllActions: () =>
    set({ sidebarAction: undefined, centreAction: undefined }),
}));
