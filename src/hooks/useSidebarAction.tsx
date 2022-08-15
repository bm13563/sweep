import create from "zustand";

interface SidebarActionProps {
  sidebarAction: JSX.Element | undefined;
  bindSidebarAction: (component: JSX.Element) => void;
  unbindSidebarAction: () => void;
}

export const useSidebarAction = create<SidebarActionProps>((set) => ({
  sidebarAction: undefined,
  bindSidebarAction: (sidebarAction: JSX.Element) =>
    set(() => ({ sidebarAction: sidebarAction })),
  unbindSidebarAction: () => set({ sidebarAction: undefined }),
}));
