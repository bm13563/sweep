import { ErrorNotification } from "@/components/ErrorNotification";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { TextField } from "@/components/TextField";
import { VerticalStack } from "@/components/VerticalStack";
import { useSidebarAction } from "@/hooks/useSidebarAction";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { generateUiLayer } from "@/primitives/uiLayer";
import { uiLayerResolver } from "@/resolvers";
import update from "immutability-helper";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";

export const AddLayerFromConfig = (): JSX.Element => {
  const [name, setName] = useState("");
  const [json, setJson] = useState("");
  const [validationError, setValidationError] = useState("");
  const [displayUi, setDisplayUi] = useState(false);
  const { bindUi, unbindUi } = useSidebarAction(
    (state) => ({
      bindUi: state.bindUi,
      unbindUi: state.unbindUi,
    }),
    shallow
  );
  const { uiLayers, setUiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const allowSubmit = !!(
    name != "" &&
    json != "" &&
    validationError.length === 0
  );

  const clearFields = () => {
    setJson("");
    setName("");
    setValidationError("");
  };

  const addLayerFromConfig = (name: string, json: string) => {
    const parsedLayer = JSON.parse(json);
    const newUiLayer = generateUiLayer({
      name: name,
      pseudolayer: parsedLayer.properties.pseudolayer,
    });
    setUiLayers(
      update(uiLayers, {
        $unshift: [newUiLayer],
      })
    );
  };

  const updateName = (value: string): void => {
    setName(value);
  };

  const onSubmit = () => {
    addLayerFromConfig(name, json);
    clearFields();
    unbindUi();
    setDisplayUi(false);
  };

  const onClose = () => {
    setDisplayUi(false);
    clearFields();
    unbindUi();
  };

  const updateJson = (value: string) => {
    setJson(value);
    try {
      const { success } = uiLayerResolver.safeParse(JSON.parse(value));
      success
        ? setValidationError("")
        : setValidationError("JSON is not a valid pseudolayer");
    } catch (e) {
      value === ""
        ? setValidationError("")
        : setValidationError("Please submit valid JSON");
    }
  };

  useEffect(() => {
    displayUi && bindUi(AddLayerFromConfigUi());
  }, [displayUi, name, json, validationError]);

  const AddLayerFromConfigUi = (): JSX.Element => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Add Layer</div>
          <Icon title="Close" className="i-mdi-close" onClick={onClose} />
        </HorizontalStack>
        <>
          {validationError.length > 0 && (
            <ErrorNotification text={validationError} />
          )}
        </>
        <div className="body1">Name</div>
        <TextField value={name} onChange={updateName} />
        <div className="body1">Pseudolayer JSON</div>
        <TextField lines={4} value={json} onChange={updateJson} />
        <HorizontalStack
          spacing={5}
          className="items-center justify-around children:w-25"
        >
          <PrimaryButton text="Apply" onClick={onSubmit} active={allowSubmit} />
          <SecondaryButton text="Clear" onClick={clearFields} />
        </HorizontalStack>
      </VerticalStack>
    );
  };

  return (
    <Icon
      title="Add layer from config"
      className="i-mdi-code-braces"
      onClick={() => setDisplayUi(true)}
    />
  );
};
