import React, { useEffect } from "react";
import { useToggleActionState } from "../../hooks/useToggleActionState";
import { useToggleSidebar } from "../../hooks/useToggleSidebar";

export const Action = () => {
  const component = useToggleActionState((state) => state.component);
  const setSidebarOpen = useToggleSidebar((state) => state.setSidebarOpen);

  useEffect(() => {
    component && setSidebarOpen(true);
  }, [component]);

  return <div className="w-full">{component}</div>;
};
