import create from "zustand";

type HandleUiStateProps = {
    component: JSX.Element | undefined;
    bindUi: (component: JSX.Element) => void;
    unbindUi: () => void;
};

export const useHandleUiState = create<HandleUiStateProps>((set) => ({
    component: undefined,
    bindUi: (component: JSX.Element) => set(() => ({ component })),
    unbindUi: () => set({ component: undefined }),
}));
