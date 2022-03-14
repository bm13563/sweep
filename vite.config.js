import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from "unocss";

export default defineConfig({
    build: {
        outDir: "build"
    },
    plugins: [
        tsConfigPaths(),
            Unocss({
                presets: [
                    presetUno(),
                ],
            }),
        ]
    });