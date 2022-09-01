import { RenderLoopContext } from "@/App";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { Viewport } from "@/ui/Viewport/Viewport";
import { defaultView } from "@/utils/utils";
import { useContext } from "react";

const view = defaultView();

export const Renderer = (): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);

  const activeUiLayer = useUiLayerState((state) => state.activeUiLayer);

  renderLoop.renderPseudolayer(
    activeUiLayer?.pendingPseudolayer || activeUiLayer?.properties.pseudolayer
  );

  return <Viewport view={view} activeUiLayer={activeUiLayer} />
  ;
} 