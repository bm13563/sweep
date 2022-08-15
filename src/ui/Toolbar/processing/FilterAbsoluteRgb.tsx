import { Dropdown } from "@/components/Dropdown";
import { ErrorNotification } from "@/components/ErrorNotification";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Slider, SliderValueProps } from "@/components/Slider";
import { VerticalStack } from "@/components/VerticalStack";
import { useAction } from "@/hooks/useAction";
import { useSidebarAction } from "@/hooks/useSidebarAction";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { generatePseudoLayer } from "@/primitives/pseudoLayer";
import {
  discardPendingPseudolayer,
  persistPendingPseudolayerAsUiLayer,
  updatePendingPseudolayer,
} from "@/primitives/uiLayer";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import { baseVertex } from "@/webgl/shaders/base.vertex";
import { filterAbsoluteRgbFragment } from "@/webgl/shaders/filterAbsoluteRgb.fragment";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

type operatorTypes = "less than" | "greater than";

const defaultValues = {
  red: "255",
  green: "255",
  blue: "255",
};

const defaultOperator = "greater than";

const operatorMapping = {
  "greater than": "greaterThan",
  "less than": "lessThan",
};

export const FilterAbsoluteRgb = (): JSX.Element => {
  const [sliderValues, setSliderValues] =
    useState<SliderValueProps>(defaultValues);
  const [operator, setOperator] = useState<operatorTypes>(defaultOperator);
  const [error, setError] = useState<string>();
  const [displayUi, setDisplayUi] = useState(false);
  const { bindSidebarAction, unbindSidebarAction } = useAction(
    (state) => ({
      bindSidebarAction: state.bindSidebarAction,
      unbindSidebarAction: state.unbindSidebarAction,
    }),
    shallow
  );
  const { uiLayers, activeUiLayer, activeIndex, setUiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      activeUiLayer: state.activeUiLayer,
      activeIndex: state.activeIndex,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const setAbsoluteRgb = (
    colours: SliderValueProps,
    operator: operatorTypes
  ) => {
    if (!(activeUiLayer && activeIndex !== undefined)) return;

    const pseudolayer = generatePseudoLayer({
      inputs: {
        u_image: activeUiLayer.properties.pseudolayer,
      },
      variables: {
        r_max: String(Number(colours.red) / 255),
        g_max: String(Number(colours.green) / 255),
        b_max: String(Number(colours.blue) / 255),
      },
      dynamics: {
        operator: operatorMapping[operator],
      },
      shaders: {
        vertexShader: baseVertex,
        fragmentShader: filterAbsoluteRgbFragment,
      },
    });

    setUiLayers(updatePendingPseudolayer(uiLayers, activeIndex, pseudolayer));

    setSliderValues(colours);
    setOperator(operator);
  };

  const reset = () => {
    if (!(activeUiLayer && activeIndex !== undefined)) return;

    setUiLayers(discardPendingPseudolayer(uiLayers, activeIndex));

    setSliderValues(defaultValues);
    setOperator(defaultOperator);
  };

  const apply = () => {
    if (
      !(
        activeUiLayer &&
        activeUiLayer.pendingPseudolayer &&
        activeIndex !== undefined
      )
    )
      return;

    setUiLayers(
      persistPendingPseudolayerAsUiLayer(
        uiLayers,
        activeIndex,
        activeUiLayer?.pendingPseudolayer
      )
    );

    setSliderValues(defaultValues);
    setOperator(defaultOperator);
  };

  const onSubmit = () => {
    apply();
    unbindSidebarAction();
    setDisplayUi(false);
  };

  const onClose = () => {
    reset();
    unbindSidebarAction();
    setDisplayUi(false);
  };

  const onRedChange = (value: string) => {
    if (!activeUiLayer) return;
    setError(undefined);

    setAbsoluteRgb(
      {
        red: value,
        green: sliderValues.green,
        blue: sliderValues.blue,
      },
      operator
    );
  };

  const onGreenChange = (value: string) => {
    if (!activeUiLayer) return;
    setError(undefined);

    setAbsoluteRgb(
      {
        red: sliderValues.red,
        green: value,
        blue: sliderValues.blue,
      },
      operator
    );
  };

  const onBlueChange = (value: string) => {
    if (!activeUiLayer) return;
    setError(undefined);

    setAbsoluteRgb(
      {
        red: sliderValues.red,
        green: sliderValues.green,
        blue: value,
      },
      operator
    );
  };

  const handleOperator = (value: string) => {
    if (value === "greater than" || value === "less than") {
      setAbsoluteRgb(
        {
          red: sliderValues.red,
          green: sliderValues.green,
          blue: sliderValues.blue,
        },
        value
      );
    }
  };

  const onError = (message: string | undefined) => {
    setError(message);
  };

  useEffect(() => {
    displayUi && bindSidebarAction(AdjustRgbUi());
  }, [displayUi, sliderValues, operator, error]);

  const AdjustRgbUi = (): JSX.Element => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Filter absolute RGB</div>
          <Icon className="i-mdi-close" title="Close" onClick={onClose} />
        </HorizontalStack>
        <>{error && <ErrorNotification text={error} />}</>
        <div className="body1">Red</div>
        <Slider
          step={1}
          min={0}
          max={255}
          defaultValue={255}
          onChange={onRedChange}
          onError={onError}
        />
        <div className="body1">Green</div>
        <Slider
          step={1}
          min={0}
          max={255}
          defaultValue={255}
          onChange={onGreenChange}
          onError={onError}
        />
        <div className="body1">Blue</div>
        <Slider
          step={1}
          min={0}
          max={255}
          defaultValue={255}
          onChange={onBlueChange}
          onError={onError}
        />
        <div className="body1">Operator</div>
        <Dropdown
          value="greater than"
          options={["greater than", "less than"]}
          onChange={handleOperator}
        />
        <div className="flex flex-col justify-center items-center children:w-25">
          <PrimaryButton text="Apply" onClick={onSubmit} active={!error} />
        </div>
      </VerticalStack>
    );
  };

  return (
    <MenuItem
      active={true}
      onClick={() => setDisplayUi(true)}
      name={"Filter RGB"}
    />
  );
};
