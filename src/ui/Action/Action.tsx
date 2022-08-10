import { useToggleActionState } from "@/hooks/useToggleActionState";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import React, { useEffect } from "react";

export const Action = () => {
  const component = useToggleActionState((state) => state.component);
  const setSidebarOpen = useToggleSidebar((state) => state.setSidebarOpen);

  useEffect(() => {
    component && setSidebarOpen(true);
  }, [component]);

  return <div className="w-full">{component}</div>;
};
