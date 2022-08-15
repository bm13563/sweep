import { ErrorNotification } from "@/components/ErrorNotification";
import { HorizontalStack } from "@/components/HorizontalStack";
import { Icon } from "@/components/Icon";
import { InfoBox } from "@/components/InfoNotification";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Slider, SliderValueProps } from "@/components/Slider";
import { VerticalStack } from "@/components/VerticalStack";
import { useAction } from "@/hooks/useAction";
import { useUiLayerState } from "@/hooks/useUiLayerState";
import { generatePseudoLayer } from "@/primitives/pseudoLayer";
import {
  discardPendingPseudolayer,
  persistPendingPseudolayerAsUiLayer,
  updatePendingPseudolayer,
} from "@/primitives/uiLayer";
import { MenuItem } from "@/ui/Toolbar/MenuItem";
import { adjustColorsFragment } from "@/webgl/shaders/adjustColors.fragment";
import { baseVertex } from "@/webgl/shaders/base.vertex";
import update from "immutability-helper";
import { useEffect, useState } from "react";

const defaultValues = {
  red: "1",
  green: "1",
  blue: "1",
};

export const AdjustRgb = () => {
  console.log("rerender")
  return <></>
}

// export const AdjustRgb = (): JSX.Element => {
//   const [sliderValues, setSliderValues] =
//     useState<SliderValueProps>(defaultValues);
//   const [error, setError] = useState<string>();
//   const [displayUi, setDisplayUi] = useState(false);
//   const { bindSidebarAction, unbindSidebarAction } = useAction.getState();
//   // const { uiLayers, setUiLayers, activeUiLayer, activeIndex } = useUiLayerState(
//   //   (state) => ({
//   //     uiLayers: state.uiLayers,
//   //     activeUiLayer: state.activeUiLayer,
//   //     activeIndex: state.activeIndex,
//   //     setUiLayers: state.setUiLayers,
//   //   }),
//   //   shallow
//   // );
//   const { uiLayers, setUiLayers, activeUiLayer, activeIndex } =
//     useUiLayerState.getState();

//   console.log("rerendering AdjustRgb");

//   const setRGBValues = (colours: SliderValueProps) => {
//     if (!(activeUiLayer && activeIndex !== undefined)) return;

//     const pseudolayer = generatePseudoLayer({
//       inputs: {
//         u_image: activeUiLayer.properties.pseudolayer,
//       },
//       variables: {
//         r_colour: colours.red,
//         g_colour: colours.green,
//         b_colour: colours.blue,
//       },
//       dynamics: {},
//       shaders: {
//         vertexShader: baseVertex,
//         fragmentShader: adjustColorsFragment,
//       },
//     });

//     setUiLayers(updatePendingPseudolayer(uiLayers, activeIndex, pseudolayer));
//     setSliderState(colours);
//   };

//   const reset = () => {
//     if (!(activeUiLayer && activeIndex !== undefined)) return;

//     setUiLayers(discardPendingPseudolayer(uiLayers, activeIndex));
//     setSliderState(defaultValues);
//   };

//   const apply = () => {
//     if (
//       !(
//         activeUiLayer &&
//         activeUiLayer.pendingPseudolayer &&
//         activeIndex !== undefined
//       )
//     )
//       return;

//     setUiLayers(
//       persistPendingPseudolayerAsUiLayer(
//         uiLayers,
//         activeIndex,
//         activeUiLayer?.pendingPseudolayer
//       )
//     );

//     setSliderState(defaultValues);
//   };

//   const onSubmit = () => {
//     apply();
//     unbindSidebarAction();
//     setDisplayUi(false);
//   };

//   const onClose = () => {
//     reset();
//     unbindSidebarAction();
//     setDisplayUi(false);
//   };

//   const setSliderState = (colours: SliderValueProps) => {
//     if (!activeUiLayer) return;

//     setSliderValues(
//       update(sliderValues, {
//         $set: {
//           red: colours.red,
//           green: colours.green,
//           blue: colours.blue,
//         },
//       })
//     );
//   };

//   const onRedChange = (value: string) => {
//     if (!activeUiLayer) return;
//     setError(undefined);

//     setRGBValues({
//       red: value,
//       green: sliderValues.green,
//       blue: sliderValues.blue,
//     });
//   };

//   const onGreenChange = (value: string) => {
//     if (!activeUiLayer) return;
//     setError(undefined);

//     setRGBValues({
//       red: sliderValues.red,
//       green: value,
//       blue: sliderValues.blue,
//     });
//   };

//   const onBlueChange = (value: string) => {
//     if (!activeUiLayer) return;
//     setError(undefined);

//     setRGBValues({
//       red: sliderValues.red,
//       green: sliderValues.green,
//       blue: value,
//     });
//   };

//   const onError = (message: string | undefined) => {
//     setError(message);
//   };

//   useEffect(() => {
//     displayUi && bindSidebarAction(AdjustRgbUi());
//   }, [displayUi, sliderValues, error]);

//   const AdjustRgbUi = (): JSX.Element => {
//     return (
//       <>
//         <HorizontalStack className="justify-between">
//           <div className="header1">Adjust RGB</div>
//           <Icon title="Close" className="i-mdi-close" onClick={onClose} />
//         </HorizontalStack>
//         <>{error && <ErrorNotification text={error} />}</>
//         <VerticalStack className="mt-2">
//           <InfoBox
//             text={`Web maps tend not to provide metadata, so it can be useful to label
//           data here yourself.`}
//           />
//           <div className="body1">Red</div>
//           <Slider
//             step={0.01}
//             min={0}
//             max={3}
//             defaultValue={1}
//             onChange={onRedChange}
//             onError={onError}
//           />
//           <div className="body1">Green</div>
//           <Slider
//             step={0.01}
//             min={0}
//             max={3}
//             defaultValue={1}
//             onChange={onGreenChange}
//             onError={onError}
//           />
//           <div className="body1">Blue</div>
//           <Slider
//             step={0.01}
//             min={0}
//             max={3}
//             defaultValue={1}
//             onChange={onBlueChange}
//             onError={onError}
//           />
//           <HorizontalStack className="flex flex-col justify-center items-center children:w-25">
//             <PrimaryButton text="Apply" onClick={onSubmit} active={!error} />
//           </HorizontalStack>
//         </VerticalStack>
//       </>
//     );
//   };

//   return (
//     <MenuItem
//       active={true}
//       onClick={() => setDisplayUi(true)}
//       name={"Adjust RGB"}
//     />
//   );
// };
