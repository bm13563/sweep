import React, { useContext } from "react";
import shallow from "zustand/shallow";
import { RenderLoopContext } from "../App";
import { Sidebar } from "./Sidebar/Sidebar";
import { Viewport } from "./Viewport/Viewport";
import { defaultView } from "../utils/utils";
import { Toolbar } from "./Toolbar/Toolbar";
import { Action } from "./Action/Action";
import { useHandleUiLayerState } from "../hooks/useHandleUiLayerState";
import { useToggleActionState } from "../hooks/useToggleActionState";
import { Overlay } from "../components/Overlay";
import { Icon } from "../components/Icon";
import { useToggleSidebar } from "../hooks/useToggleSidebar";

const view = defaultView();

export const Layout = (): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);

  const component = useToggleActionState((state) => state.component);
  const activeUiLayer = useHandleUiLayerState((state) => state.activeUiLayer);
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
