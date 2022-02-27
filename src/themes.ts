export const palette = {
    base: {
        lightest: "#f6f6f6",
        light: "#999999",
        dark: "#4c4c4c",
        darkest: "#000000",
    },
    primary: {
        lightest: "#d2bcea",
        light: "#a37cd3",
        dark: "#6e3cbc",
        darkest: "#4a2b79",
    },
    secondary: {
        lightest: "#bcd0ef",
        light: "#98bae7",
        dark: "#637893",
        darkest: "#333c48",
    },
    tertiary: "#B8E4F0",
};

export const spacing = {
    spacing1: "0.125rem",
    spacing2: "0.25rem",
    spacing3: "0.5rem",
    spacing4: "1rem",
    spacing5: "2rem",
    spacing6: "4rem",
    spacing7: "8rem",
};

export const colors = {
    text: {
        default: {
            color: palette.base.darkest,
        },
    },
    background: {
        default: {
            backgroundColor: palette.base.lightest,
        },
        hover: {
            "&:hover": {
                backgroundColor: palette.base.light,
                cursor: "pointer",
            },
        },
        disabled: {
            backgroundColor: palette.base.dark,
        },
    },
    primaryComponent: {
        default: {
            backgroundColor: palette.primary.lightest,
        },
        hover: {
            "&:hover": {
                backgroundColor: palette.primary.light,
                cursor: "pointer",
            },
        },
        disabled: {
            backgroundColor: palette.base.light,
        },
    },
    secondaryComponent: {
        default: {
            backgroundColor: palette.secondary.lightest,
        },
        hover: {
            "&:hover": {
                backgroundColor: palette.secondary.light,
                cursor: "pointer",
            },
        },
        disabled: {
            backgroundColor: palette.base.light,
        },
    },
};

export const utility = {
    pointer: {
        "&:hover": { cursor: "pointer" },
    },
    radius: {
        borderRadius: spacing.spacing2,
    },
};
