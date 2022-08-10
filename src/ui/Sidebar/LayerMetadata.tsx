import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { InfoBox } from "@/components/InfoBox";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TextField } from "@/components/TextField";
import { VerticalStack } from "@/components/VerticalStack";
import { useToggleActionState } from "@/hooks/useToggleActionState";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { UiLayer } from "@/primitives/uiLayer";
import update from "immutability-helper";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";

export const LayerMetadata = ({
  uiLayer,
  index,
}: {
  uiLayer: UiLayer;
  index: number;
}) => {
  const [displayUi, setDisplayUi] = useState(false);
  const [description, setDescription] = useState(
    uiLayer.properties.pseudolayer.metadata.description
  );
  const [band1, setBand1] = useState(
    uiLayer.properties.pseudolayer.metadata.band1
  );
  const [band2, setBand2] = useState(
    uiLayer.properties.pseudolayer.metadata.band2
  );
  const [band3, setBand3] = useState(
    uiLayer.properties.pseudolayer.metadata.band3
  );
  const [band4, setBand4] = useState(
    uiLayer.properties.pseudolayer.metadata.band4
  );

  const { uiLayers, setUiLayers } = useUiLayerState(
    (state) => ({
      uiLayers: state.uiLayers,
      setUiLayers: state.setUiLayers,
    }),
    shallow
  );

  const { bindUi, unbindUi } = useToggleActionState(
    (state) => ({
      bindUi: state.bindUi,
      unbindUi: state.unbindUi,
    }),
    shallow
  );

  const onClose = () => {
    setDisplayUi(false);
    unbindUi();
  };

  const onDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const onBand1Change = (newBand1: string) => {
    setBand1(newBand1);
  };

  const onBand2Change = (newBand2: string) => {
    setBand2(newBand2);
  };

  const onBand3Change = (newBand3: string) => {
    setBand3(newBand3);
  };

  const onBand4Change = (newBand4: string) => {
    setBand4(newBand4);
  };

  const onSubmit = () => {
    const newMetadata = {
      description,
      band1,
      band2,
      band3,
      band4,
    };
    setUiLayers(
      update(uiLayers, {
        [index]: {
          properties: { pseudolayer: { metadata: { $set: newMetadata } } },
        },
      })
    );
    setDisplayUi(false);
    unbindUi();
  };

  useEffect(() => {
    displayUi && bindUi(LayerUi());
  }, [displayUi, description, band1, band2, band3, band4]);

  const LayerUi = (): JSX.Element => {
    return (
      <VerticalStack spacing={2}>
        <HorizontalStack className="justify-between mb-1">
          <div className="header1">Layer Metadata</div>
          <Icon title="Close" className="i-mdi-close" onClick={onClose} />
        </HorizontalStack>
        <InfoBox
          text={`Web maps tend not to provide metadata, so it can be useful to label
          data here yourself.`}
        />
        <div className="body1">Description:</div>
        <TextField
          value={description}
          onChange={onDescriptionChange}
          lines={3}
        />
        <div className="body1">Band 1:</div>
        <TextField value={band1} onChange={onBand1Change} />
        <div className="body1">Band 2:</div>
        <TextField value={band2} onChange={onBand2Change} />
        <div className="body1">Band 3:</div>
        <TextField value={band3} onChange={onBand3Change} />
        <div className="body1">Band 4:</div>
        <TextField value={band4} onChange={onBand4Change} />
        <PrimaryButton text="Apply" onClick={onSubmit} />
      </VerticalStack>
    );
  };
  return (
    <Icon
      title="View layer metadata"
      className="i-mdi-information"
      onClick={() => setDisplayUi(true)}
    />
  );
};
