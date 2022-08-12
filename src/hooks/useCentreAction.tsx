import create from "zustand";

interface CentreActionProps {
  component: JSX.Element | undefined;
  bindUi: (component: JSX.Element) => void;
  unbindUi: () => void;
}

export const useCentreAction = create<CentreActionProps>((set) => ({
  component: undefined,
  bindUi: (component: JSX.Element) => set(() => ({ component })),
  unbindUi: () => set({ component: undefined }),
}));
