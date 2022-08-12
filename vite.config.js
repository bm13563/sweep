import presetIcons from '@unocss/preset-icons';
import { presetUno } from "unocss";
import Unocss from 'unocss/vite';
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'


export default defineConfig({
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
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