import create from "zustand";

type HandleUiProps = {
    component: JSX.Element | undefined;
    bindUi: (component: JSX.Element) => void;
    unbindUi: () => void;
};

export const HandleUi = create<HandleUiProps>((set, get) => ({
    component: undefined,
    bindUi: (component: JSX.Element) => set(() => ({ component })),
    unbindUi: () => set({ component: undefined }),
}));
