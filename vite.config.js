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
                    if (!matcher.startsWith("children:"))
                        return matcher
                    return {
                        matcher: matcher.slice(12),
                        selector: s => `${s}>*`,
                    }
                },
                (matcher) => {
                    // nth-child:1:blah
                    if (!matcher.startsWith("nth:")) {
                        return matcher
                    }
                    const split = matcher.split(":")
                    return {
                        matcher: split[split.length - 1],
                        selector: s => `${s}>*:nth-child(${split[1]})`
                    }
                }
            ],
            // seem to need self-executing function
            safelist: (() =>  [
                ...[...Array(10).keys()].flatMap((c) => [`children:mt-${c}`, `children:ml-${c}`, `h-${c}`, `w-${c}`]),
            ])(),
            shortcuts: {
                border: "rounded border-solid border-1 border-slate-900 py-2 px-1",
                disabled: "pointer-events-none bg-slate-500",
                header1: "font-sans text-xl text-slate-900",
                body1: "font-sans text-base text-slate-900",
                subscript1: "font-sans text-sm text-slate-900",
                subscript2: "font-sans text-xs text-slate-900",
            },
        }),
    ],
});