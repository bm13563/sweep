import create from "zustand";

interface themeProps {
  theme: string;
  $: (matcher: string) => string;
}

export const useTheme = create<themeProps>((set, get) => ({
  theme: "greens",
  $: (matcher: string) => `${get().theme}-${matcher} backgroundPrimary`,
}));
