import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import Unocss from 'unocss/vite';
import { presetUno } from "unocss";
import presetIcons from '@unocss/preset-icons'


export default defineConfig({
    build: {
        outDir: "build"
    },
    plugins: [
        tsConfigPaths(),
        Unocss({
            presets: [
                presetIcons({}),
                presetUno(),
            ],
            variants: [
                (matcher) => {
                    if (!matcher.startsWith('children:'))
                        return matcher
                    return {
                        matcher: matcher.slice(9),
                        selector: s => `${s} > *`,
                    }
                }
            ],
            // seem to need self-executing function
            safelist: (() =>  [
                ...[...Array(10).keys()].flatMap((c) => [`mt-${c}`, `ml-${c}`, `h-${c}`, `w-${c}`]),
            ])(),
            shortcuts: {
                border: "rounded border-solid border-1 border-slate-900 py-2 px-1",
            },
        }),
    ],
});