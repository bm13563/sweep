import create from "zustand";

interface toggleSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (newState: boolean) => void;
}

export const useToggleSidebar = create<toggleSidebarProps>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen: boolean) => {
    set(() => ({ sidebarOpen }));
  },
}));
