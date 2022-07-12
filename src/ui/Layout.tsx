import React, { useContext, useState } from "react";
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

const view = defaultView();

export const Layout = (): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);

  const component = useToggleActionState((state) => state.component);
  const activeUiLayer = useHandleUiLayerState((state) => state.activeUiLayer);

  const [viewSidebar, setViewSidebar] = useState(true);

  const updateSidebarState = () => {
    setViewSidebar(!viewSidebar);
  };

  renderLoop.renderPseudolayer(
    activeUiLayer?.pendingPseudolayer || activeUiLayer?.properties.pseudolayer
  );

  return (
    <div
      className="grid content-start"
      style={{
        height: "calc(100vh - 16px)",
        gridTemplateRows: "[r1] 2rem [r2] calc(100vh - 16px - 2rem) [rend]", // 2.5rem === h-10
        gridTemplateColumns: `[c1] ${
          viewSidebar ? "15rem" : "0"
        } [c2] auto [cend]`, // rem === w-60
      }}
    >
      <div className="row-start-1 col-start-1 flex flex-col justify-center">
        <Icon
          className="i-mdi-chevron-left hover:bg-gray"
          onClick={updateSidebarState}
        />
      </div>
      <div className="row-start-1 col-start-2 h-8">
        <Toolbar />
      </div>
      <div className="row-start-2 col-start-1 flex flex-col">
        <Overlay display={component ? 1 : 0}>
          <Sidebar key={"sidebar"} />
          <Action key={"action"} />
        </Overlay>
      </div>
      <div className="row-start-2 col-start-2 flex justify-center items-center">
        {!viewSidebar && (
          <div className="absolute flex justify-center items-center left-0 z-4">
            <Icon
              className="i-mdi-chevron-right hover:bg-gray"
              size={10}
              onClick={updateSidebarState}
            />
          </div>
        )}
        <Viewport view={view} activeUiLayer={activeUiLayer} />
      </div>
    </div>
  );
};
