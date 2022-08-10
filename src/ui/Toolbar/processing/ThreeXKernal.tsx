import { RenderLoopContext } from "@/App";
import { ErrorNotification } from "@/components/ErrorNotification";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { KernelInput } from "@/components/KernelInput";
import { PrimaryButton } from "@/components/PrimaryButton";
import { VerticalStack } from "@/components/VerticalStack";
import { useToggleActionState } from "@/hooks/useToggleActionState";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { generatePseudoLayer } from "@/primitives/pseudoLayer";
import {
  persistPendingPseudolayerAsUiLayer,
  updatePendingPseudolayer,
} from "@/primitives/uiLayer";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import { isNumber } from "@/utils/utils";
import { baseVertex } from "@/webgl/shaders/base.vertex";
import { threeXKernalFragment } from "@/webgl/shaders/threeXKernel.fragment";
import React, { useContext, useEffect, useState } from "react";
import shallow from "zustand/shallow";

const defaultKernelValues = [
  ["0", "0", "0"],
  ["0", "1", "0"],
  ["0", "0", "0"],
];

export const ThreeXKernal = (): JSX.Element => {
  const renderLoop = useContext(RenderLoopContext);

  const [displayUi, setDisplayUi] = useState(false);
  const [kernelValues, setKernelValues] =
    useState<string[][]>(defaultKernelValues);
  const [error, setError] = useState<string>();

  const { bindUi, unbindUi } = useToggleActionState(
    (state) => ({
      bindUi: state.bindUi,
      unbindUi: state.unbindUi,
    }),
    shallow
  );
  const { uiLayers, setUiLayers, activeUiLayer, activeIndex } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
      activeUiLayer: state.activeUiLayer,
      activeIndex: state.activeIndex,
    }),
    shallow
  );

  const setThreeXKernal = (kernel: string[][]) => {
    const flatKernel = kernel.flat();
    if (!(activeUiLayer && activeIndex !== undefined)) return;
    if (!renderLoop.gl) return;
    if (flatKernel.find((element) => !isNumber(element))) return;

    const pseudolayer = generatePseudoLayer({
      inputs: {
        u_image: activeUiLayer.properties.pseudolayer,
      },
      variables: {
        textureWidth: `${renderLoop.gl.canvas.width}`,
        textureHeight: `${renderLoop.gl.canvas.height}`,
        kernel: flatKernel,
        kernelWeight: "1",
      },
      dynamics: {},
      shaders: {
        vertexShader: baseVertex,
        fragmentShader: threeXKernalFragment,
      },
    });

    setUiLayers(updatePendingPseudolayer(uiLayers, activeIndex, pseudolayer));
    setKernelValues(kernel);
    setError(undefined);
  };

  const apply = () => {
    if (
      !(
        activeUiLayer &&
        activeUiLayer.pendingPseudolayer &&
        activeIndex !== undefined
      )
    )
      return false;

    setUiLayers(
      persistPendingPseudolayerAsUiLayer(
        uiLayers,
        activeIndex,
        activeUiLayer?.pendingPseudolayer
      )
    );

    setKernelValues(defaultKernelValues);
    return true;
  };

  const onSubmit = () => {
    apply();
    unbindUi();
    setDisplayUi(false);
  };

  const onClose = () => {
    unbindUi();
    setDisplayUi(false);
  };

  useEffect(() => {
    displayUi && bindUi(ThreeXKernalUi());
  }, [displayUi, bindUi, error, kernelValues]);

  const ThreeXKernalUi = (): JSX.Element => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">3x3 kernel</div>
          <Icon className="i-mdi-close" title="Close" onClick={onClose} />
        </HorizontalStack>
        <>{error && <ErrorNotification errorText={error} />}</>
        <KernelInput
          rows={3}
          cols={3}
          values={kernelValues}
          onChange={(kernel: string[][]) => setThreeXKernal(kernel)}
          onError={(message: string | undefined) => {
            setError(message);
          }}
        />
        <div className="flex flex-col justify-center items-center children:w-25">
          <PrimaryButton text="Apply" onClick={onSubmit} active={!error} />
        </div>
      </VerticalStack>
    );
  };

  return (
    <MenuItem
      name="3x3 Kernal"
      onClick={() => {
        setThreeXKernal(kernelValues);
        setDisplayUi(true);
      }}
      active={true}
    />
  );
};
