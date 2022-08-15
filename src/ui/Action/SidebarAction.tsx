import { useAction } from "@/hooks/useAction";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useEffect } from "react";

export const SidebarAction = () => {
  const sidebarAction = useAction((state) => state.sidebarAction);
  const setSidebarOpen = useToggleSidebar((state) => state.setSidebarOpen);

  useEffect(() => {
    sidebarAction && setSidebarOpen(true);
  }, [sidebarAction]);

  return <div className="w-full">{sidebarAction}</div>;
};
