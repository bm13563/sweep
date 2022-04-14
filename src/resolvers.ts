import { z } from "zod";
import { Layer, XyzConfig } from "./ui/mapPanel/layers/layer";
import {
    Pseudolayer,
    PseudolayerConfig,
    ShaderProps,
} from "./ui/mapPanel/layers/pseudolayer";
import { UiLayer, UiLayerConfig } from "./ui/uiLayer";

export const xyzLayerResolver: z.ZodSchema<XyzConfig> = z.lazy(() =>
    z.object({
        type: z.literal("XYZ"),
        url: z.string(),
    })
);

export const layerResolver: z.ZodSchema<Layer> = z.lazy(() =>
    z.object({
        uid: z.string(),
        type: z.literal("baseLayer"),
        config: xyzLayerResolver,
    })
);

export const shaderPropsResolver: z.ZodSchema<ShaderProps> = z.lazy(() =>
    z.object({
        vertexShader: z.string(),
        fragmentShader: z.string(),
    })
);

export const pseudolayerConfigResolver: z.ZodSchema<PseudolayerConfig> = z.lazy(
    () =>
        z.object({
            inputs: z.record(z.union([layerResolver, pseudolayerResolver])),
            variables: z.record(z.string()),
            dynamics: z.record(z.string()),
            shaders: shaderPropsResolver,
        })
);

export const pseudolayerResolver: z.ZodSchema<Pseudolayer> = z.lazy(() =>
    z.object({
        uid: z.string(),
        type: z.literal("pseudolayer"),
        config: pseudolayerConfigResolver,
    })
);

export const uiLayerConfigResolver: z.ZodSchema<UiLayerConfig> = z.lazy(() =>
    z.object({
        name: z.string(),
        pseudolayer: pseudolayerResolver,
    })
);

export const uiLayerResolver: z.ZodSchema<UiLayer> = z.lazy(() =>
    z.object({
        uid: z.string(),
        visible: z.boolean(),
        config: uiLayerConfigResolver,
        pendingPseudolayer: pseudolayerResolver.optional(),
    })
);
