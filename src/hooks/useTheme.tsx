import create from "zustand";

interface ThemeProps {
  theme: string;
  $: (matcher: string) => string;
}

export const useTheme = create<ThemeProps>((set, get) => ({
  theme: "greens",
  $: (matcher: string) => `${get().theme}-${matcher} backgroundPrimary`,
}));
