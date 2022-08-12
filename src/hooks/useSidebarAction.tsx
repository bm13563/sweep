import create from "zustand";

interface SidebarActionProps {
  component: JSX.Element | undefined;
  bindUi: (component: JSX.Element) => void;
  unbindUi: () => void;
}

export const useSidebarAction = create<SidebarActionProps>((set) => ({
  component: undefined,
  bindUi: (component: JSX.Element) => set(() => ({ component })),
  unbindUi: () => set({ component: undefined }),
}));
