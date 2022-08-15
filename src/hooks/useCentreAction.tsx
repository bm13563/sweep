import create from "zustand";

interface CentreActionProps {
  centreAction: JSX.Element | undefined;
  bindCentreAction: (component: JSX.Element) => void;
  unbindCentreAction: () => void;
}

export const useCentreAction = create<CentreActionProps>((set) => ({
  centreAction: undefined,
  bindCentreAction: (component: JSX.Element) =>
    set(() => ({ centreAction: component })),
  unbindCentreAction: () => set({ centreAction: undefined }),
}));
