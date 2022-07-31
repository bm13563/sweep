import React, { useEffect, useState } from "react";
import { baseFragment } from "../../webgl/shaders/base.fragment";
import { baseVertex } from "../../webgl/shaders/base.vertex";
import { generateLayer } from "../../primitives/baseLayer";
import { generatePseudoLayer } from "../../primitives/pseudoLayer";
import { generateUiLayer } from "../../primitives/uiLayer";
import { Icon } from "../../components/Icon";
import { HorizontalStack } from "../../components/HorizontalStack";
import { VerticalStack } from "../../components/VerticalStack";
import { useToggleActionState } from "../../hooks/useToggleActionState";
import { TextField } from "../../components/TextField";
import { Dropdown } from "../../components/Dropdown";
import { PrimaryButton } from "../../components/PrimaryButton";
import update from "immutability-helper";
import shallow from "zustand/shallow";
import { SecondaryButton } from "../../components/SecondaryButton";
import { useHandleUiLayerState } from "../../hooks/useHandleUiLayerState";

export interface AddLayerProps {
  name: string;
  type: "XYZ";
  url: string;
}

export const AddLayer = (): JSX.Element => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [displayUi, setDisplayUi] = useState(false);
  const { bindUi, unbindUi } = useToggleActionState(
    (state) => ({
      bindUi: state.bindUi,
      unbindUi: state.unbindUi,
    }),
    shallow
  );
  const { uiLayers, setUiLayers } = useHandleUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const allowSubmit = !!(name != "" && type != "" && url != "");

  const clearFields = () => {
    setName("");
    setUrl("");
    setType("");
  };

  const addUiLayer = ({ name, type, url }: AddLayerProps) => {
    const layer = generateLayer({ type: type, url: url });
    const pseudolayer = generatePseudoLayer({
      inputs: { u_image: layer },
      variables: {},
      dynamics: {},
      shaders: { vertexShader: baseVertex, fragmentShader: baseFragment },
    });
    const uiLayer = generateUiLayer({
      name: name,
      pseudolayer: pseudolayer,
    });
    setUiLayers(
      update(uiLayers, {
        $unshift: [uiLayer],
      })
    );
  };

  const updateLayerType = (value: string): void => {
    setType(value);
  };

  const updateName = (value: string): void => {
    setName(value);
  };

  const updateUrl = (value: string): void => {
    setUrl(value);
  };

  const onSubmit = () => {
    //https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
    //https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png
    addUiLayer({
      name: name,
      type: "XYZ",
      url: url,
    });
    clearFields();
    unbindUi();
    setDisplayUi(false);
  };

  const onClose = () => {
    setDisplayUi(false);
    clearFields();
    unbindUi();
  };

  useEffect(() => {
    displayUi && bindUi(AddLayerUi());
  }, [displayUi, allowSubmit, name, type, url]);

  const AddLayerUi = (): JSX.Element => {
    return (
      <>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Add Layer</div>
          <Icon title="Close" className="i-mdi-close" onClick={onClose} />
        </HorizontalStack>
        <VerticalStack spacing={1}>
          <div className="body1">Name</div>
          <TextField value={name} onChange={updateName} />
          <div className="body1">Type</div>
          <Dropdown options={["XYZ"]} onChange={updateLayerType} value={type} />
          <div className="body1">URL</div>
          <TextField value={url} onChange={updateUrl} />
          <HorizontalStack
            spacing={5}
            className="items-center justify-around children:w-25"
          >
            <PrimaryButton
              text="Apply"
              onClick={onSubmit}
              active={allowSubmit}
            />
            <SecondaryButton text="Clear" onClick={clearFields} />
          </HorizontalStack>
        </VerticalStack>
      </>
    );
  };

  return (
    <Icon
      title="Add layer"
      className="i-mdi-add"
      onClick={() => setDisplayUi(true)}
    />
  );
};
