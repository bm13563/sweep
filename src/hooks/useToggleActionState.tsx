import create from "zustand";

type ToggleActionStateProps = {
  component: JSX.Element | undefined;
  bindUi: (component: JSX.Element) => void;
  unbindUi: () => void;
};

export const useToggleActionState = create<ToggleActionStateProps>((set) => ({
  component: undefined,
  bindUi: (component: JSX.Element) => set(() => ({ component })),
  unbindUi: () => set({ component: undefined }),
}));
