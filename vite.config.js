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
            rules: [
              [/^text-(.*)$/, ([, c], { theme }) => {
                if (theme.colors[c])
                  return { color: theme.colors[c] }
              }],
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
                ...[...Array(100).keys()].flatMap((c) => [`children:mt-${c}`, `children:ml-${c}`, `h-${c}`, `w-${c}`]),
            ])(),
            shortcuts: {
                border: "rounded-sm border-solid border-border-primary border-1 py-2 px-1",
                header1: "font-sans text-xl text-text-primary",
                body1: "font-sans text-base text-text-primary",
                subscript1: "font-sans text-sm text-text-primary",
                subscript2: "font-sans text-xs text-text-primary",
            },
            theme: {
              colors: {
                background: {
                  primary: "#fafafa",
                },
                items: {
                  primary: "#e6f2ff",
                  accent: "#b3d7ff",
                  disabled: "#949ca6"
                },
                text: {
                  primary: "#2b2b2b",
                  accent: "#9ca38f"
                },
                border: {
                  primary: "#fafafa",
                  secondary: "none",
                  accent: "#b3d7ff",
                }
              }
            }
        }),
    ],
});