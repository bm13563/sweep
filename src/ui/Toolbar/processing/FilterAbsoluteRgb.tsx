import throttle from "lodash.throttle";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { ErrorNotification } from "../../../components/ErrorNotification";
import { HorizontalStack } from "../../../components/HorizontalStack";
import { Icon } from "../../../components/Icon";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { Slider, SliderValueProps } from "../../../components/Slider";
import { VerticalStack } from "../../../components/VerticalStack";
import { useToggleActionState } from "../../../hooks/useToggleActionState";
import { baseVertex } from "../../../webgl/shaders/base.vertex";
import { filterAbsoluteRgbFragment } from "../../../webgl/shaders/filterAbsoluteRgb.fragment";
import { generatePseudoLayer } from "../../../primitives/pseudoLayer";
import { MenuItem } from "../MenuItem";
import { Dropdown } from "../../../components/Dropdown";
import { useHandleUiLayerState } from "../../../hooks/useHandleUiLayerState";
import {
  updatePendingPseudolayer,
  discardPendingPseudolayer,
  persistPendingPseudolayerAsUiLayer,
} from "../../../primitives/uiLayer";

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
  const { bindUi, unbindUi } = useToggleActionState(
    (state) => ({
      bindUi: state.bindUi,
      unbindUi: state.unbindUi,
    }),
    shallow
  );
  const { uiLayers, activeUiLayer, activeIndex, setUiLayers } =
    useHandleUiLayerState(
      (state) => ({
        uiLayers: state.uiLayers,
        activeUiLayer: state.activeUiLayer,
        activeIndex: state.activeIndex,
        setUiLayers: state.setUiLayers,
      }),
      shallow
    );

  const setAbsoluteRgb = throttle(
    (colours: SliderValueProps, operator: operatorTypes) => {
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
    },
    250
  );

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
    unbindUi();
    setDisplayUi(false);
  };

  const onClose = () => {
    reset();
    unbindUi();
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
    displayUi && bindUi(AdjustRgbUi());
  }, [displayUi, sliderValues, operator, error]);

  const AdjustRgbUi = (): JSX.Element => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Filter absolute RGB</div>
          <Icon className="i-mdi-close" onClick={onClose} />
        </HorizontalStack>
        <>{error && <ErrorNotification errorText={error} />}</>
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
          options={["greater than", "less than"]}
          onChange={handleOperator}
          defaultValue={operator}
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
      name={"Filter Absolute RGB"}
    />
  );
};
