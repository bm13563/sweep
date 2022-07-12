import { z } from "zod";
import {
  Layer,
  XyzProperties,
  OfflineProperties,
} from "./primitives/baseLayer";
import {
  PseudoLayer,
  PseudolayerProperties,
  ShaderProps,
} from "./primitives/pseudoLayer";
import { UiLayer, UiLayerProperties } from "./primitives/uiLayer";

export const xyzLayerResolver: z.ZodSchema<XyzProperties> = z.lazy(() =>
  z.object({
    type: z.literal("XYZ"),
    url: z.string(),
  })
);

export const offlineLayerResolver: z.ZodSchema<OfflineProperties> = z.lazy(() =>
  z.object({
    type: z.literal("offline"),
    url: z.string(),
  })
);

export const layerResolver: z.ZodSchema<Layer> = z.lazy(() =>
  z.object({
    uid: z.string(),
    type: z.literal("baseLayer"),
    properties: z.union([xyzLayerResolver, offlineLayerResolver]),
  })
);

export const shaderPropsResolver: z.ZodSchema<ShaderProps> = z.lazy(() =>
  z.object({
    vertexShader: z.string(),
    fragmentShader: z.string(),
  })
);

export const pseudolayerPropertiesResolver: z.ZodSchema<PseudolayerProperties> =
  z.lazy(() =>
    z.object({
      inputs: z.record(z.union([layerResolver, pseudolayerResolver])),
      variables: z.record(z.string()),
      dynamics: z.record(z.string()),
      shaders: shaderPropsResolver,
    })
  );

export const pseudolayerResolver: z.ZodSchema<PseudoLayer> = z.lazy(() =>
  z.object({
    uid: z.string(),
    type: z.literal("pseudolayer"),
    properties: pseudolayerPropertiesResolver,
  })
);

export const uiLayerPropertiesResolver: z.ZodSchema<UiLayerProperties> = z.lazy(
  () =>
    z.object({
      name: z.string(),
      pseudolayer: pseudolayerResolver,
    })
);

export const uiLayerResolver: z.ZodSchema<UiLayer> = z.lazy(() =>
  z.object({
    uid: z.string(),
    visible: z.boolean(),
    properties: uiLayerPropertiesResolver,
    pendingPseudolayer: pseudolayerResolver.optional(),
  })
);
