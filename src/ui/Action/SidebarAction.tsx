import { useSidebarAction } from "@/hooks/useSidebarAction";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useEffect } from "react";

export const SidebarAction = () => {
  const component = useSidebarAction((state) => state.component);
  const setSidebarOpen = useToggleSidebar((state) => state.setSidebarOpen);

  useEffect(() => {
    component && setSidebarOpen(true);
  }, [component]);

  return <div className="w-full">{component}</div>;
};
