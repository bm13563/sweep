import { RenderLoopContext } from "@/App";
import { Icon } from "@/components/Icon";
import { Overlay } from "@/components/Overlay";
import { useToggleActionState } from "@/hooks/useToggleActionState";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { Action } from "@/ui/Action/Action";
import { Sidebar } from "@/ui/Sidebar/Sidebar";
import { Toolbar } from "@/ui/Toolbar/Toolbar";
import { Viewport } from "@/ui/Viewport/Viewport";
import { defaultView } from "@/utils/utils";
import React, { useContext } from "react";
import shallow from "zustand/shallow";

const view = defaultView();

export const Layout = (): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);

  const component = useToggleActionState((state) => state.component);
  const activeUiLayer = useUiLayerState((state) => state.activeUiLayer);
  const { sidebarOpen, setSidebarOpen } = useToggleSidebar(
    (state) => ({
      sidebarOpen: state.sidebarOpen,
      setSidebarOpen: state.setSidebarOpen,
    }),
    shallow
  );

  renderLoop.renderPseudolayer(
    activeUiLayer?.pendingPseudolayer || activeUiLayer?.properties.pseudolayer
  );

  return (
    <div
      className="grid content-start"
      style={{
        height: "calc(100vh - 8px)",
        gridTemplateRows: "[r1] 1.5rem [r2] calc(100vh - 8px - 1.5rem) [rend]", // 2.5rem === h-10
        gridTemplateColumns: `[c1] ${
          sidebarOpen ? "17.5rem" : "0"
        } [c2] auto [cend]`,
      }}
    >
      <div
        className={`row-start-1 col-start-1 flex flex-col justify-center bg-blues-background-primary`}
      >
        <Icon
          title="Hide sidebar"
          className="i-mdi-chevron-left"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <div className="row-start-1 col-start-2 flex items-center bg-blues-background-primary">
        <Toolbar />
      </div>
      <div className="row-start-2 col-start-1 flex flex-col">
        <Overlay
          display={component ? 1 : 0}
          className="bg-blues-background-primary px-2"
        >
          <Sidebar key={"sidebar"} />
          <Action key={"action"} />
        </Overlay>
      </div>
      <div className="row-start-2 col-start-2 flex justify-center items-center">
        {!sidebarOpen && (
          <div className="absolute flex justify-center items-center left-0 z-4">
            <Icon
              title="Show sidebar"
              className="i-mdi-chevron-right"
              size={10}
              onClick={() => setSidebarOpen(true)}
            />
          </div>
        )}
        <Viewport view={view} activeUiLayer={activeUiLayer} />
      </div>
    </div>
  );
};
