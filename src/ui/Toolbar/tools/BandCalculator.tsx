import { Dropdown } from "@/components/Dropdown";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TextField } from "@/components/TextField";
import { VerticalStack } from "@/components/VerticalStack";
import { useAction } from "@/hooks/useAction";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

const operators = ["(", ")", "+", "-", "*", "/"];

export const BandCalculator = () => {
  // const build = new ShaderBuilder();

  const [equation, setEquation] = useState("");
  // const [error, setError] = useState<string>();
  const [displayUi, setDisplayUi] = useState(false);
  const { bindCentreAction, unbindCentreAction } = useAction(
    (state) => ({
      bindCentreAction: state.bindCentreAction,
      unbindCentreAction: state.unbindCentreAction,
    }),
    shallow
  );

  const { uiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      activeUiLayer: state.activeUiLayer,
      activeIndex: state.activeIndex,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const onClose = () => {
    setDisplayUi(false);
    unbindCentreAction();
  };

  const removeLast = () => {
    const equationParts = equation.split(" ");
    equationParts.pop();
    const newEquation = equationParts.join(" ");
    setEquation(newEquation);
  };

  const updateEquation = (value: string) => {
    setEquation(equation + " " + value);
  };

  useEffect(() => {
    console.log("effect");
    displayUi && bindCentreAction(BandCalculatorUi());
  }, [displayUi, equation]);

  const bandOptions: string[] = [];
  uiLayers.forEach((uiLayer) => {
    const metadata = uiLayer.properties.pseudolayer.metadata;
    const name = uiLayer.properties.name;
    bandOptions.push(name + "." + metadata.band1);
    bandOptions.push(name + "." + metadata.band2);
    bandOptions.push(name + "." + metadata.band3);
    bandOptions.push(name + "." + metadata.band4);
  });

  const BandCalculatorUi = () => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Band Calculator</div>
          <Icon className="i-mdi-close" title="Close" onClick={onClose} />
        </HorizontalStack>
        <div className="body1">Valid bands</div>
        <Dropdown value="" options={bandOptions} onChange={updateEquation} />
        <div className="body1">Valid operators</div>
        <Dropdown value="" options={operators} onChange={updateEquation} />
        <div className="body1">Equation</div>
        <TextField value={equation} lines={5} className="pointer-events-none" />
        <HorizontalStack className="flex flex-row justify-between items-center children:w-25">
          <PrimaryButton text="Apply" onClick={() => undefined} />
          <PrimaryButton text="Remove last" onClick={removeLast} />
        </HorizontalStack>
      </VerticalStack>
    );
  };

  return (
    <MenuItem
      active={true}
      onClick={() => setDisplayUi(true)}
      name={"Band Calculator"}
    />
  );
};
