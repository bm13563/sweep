
let __unconfig_data;
let __unconfig_stub = function (data) { __unconfig_data = data };
__unconfig_stub.default = (data) => { __unconfig_data = data };
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
const Unocss = __unconfig_stub;;
import { presetUno } from "unocss";
import presetIcons from '@unocss/preset-icons'

const __unconfig_default =  defineConfig({
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
          // nth:1:blah
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
      safelist: [
        ...[...Array(100).keys()].flatMap((c) => [`children:mt-${c}`, `children:ml-${c}`, `h-${c}`, `w-${c}`]),
      ],
      shortcuts: {
        border: "rounded-sm border-solid border-1",
        header1: "font-sans text-xl text-blues-text-primary",
        body1: "font-sans text-base text-blues-text-primary",
        subscript1: "font-sans text-sm text-blues-text-primary",
        subscript2: "font-sans text-xs text-blues-text-primary",
      },
      theme: {
        colors: {
          blues: {
            background: {
              primary: "#fafafa",
              secondary: "#d2d2d2",
              accent: "#9e9e9e",
            },
            items: {
              primary: "#e6f2ff",
              secondary: "#e6ffea",
              error: "#ffe6e6",
              accent: "#b3d7ff",
              disabled: "#949ca6",
            },
            text: {
              primary: "#2b2b2b",
              accent: "#9ca38f",
            },
            border: {
              primary: "#fafafa",
              secondary: "none",
              accent: "#b3d7ff",
            }
          },
          greens: {
            background: {
              primary: "red",
              secondary: "#d2d2d2",
              accent: "#9e9e9e",
            },
          },
        },
      }
    }),
  ],
});
if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;