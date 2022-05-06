import { Color, createTheme, StyleRules, Theme } from "@material-ui/core";

interface MuiDropzoneNameToClassKey {
    MuiDropzoneArea: "root" | "text" | "active" | "invalid" | "textContainer" | "icon";
    MuiDropzonePreviewList: "root" | "imageContainer" | "image" | "removeButton";
    MuiDropzoneSnackbar: "infoAlert" | "successAlert" | "warningAlert" | "errorAlert" | "message" | "icon" | "closeButton";
}

const colors = {
    primary: "#929293",
    primaryLight: "#FFFFFF",
    primaryDark: "#002350",
    secondary: "#FFFFFF",
    secondaryLight: "#FF6F5B",
    secondaryDark: "#9D0007",
};

const neutral: Partial<Color> = {
    50: "#e6e6e6",
    100: "#d9d9d9",
    200: "#b3b3b3",
    300: "#828282",
    400: "#676767",
    500: "#4c4c4c",
    600: "#454545",
    700: "#3c3c3c",
    800: "#333333",
    900: "#242424",
};

const fontFamily = {
    roboto: "Roboto, sans-serif",
    asap: "Asap, Roboto, sans-serif",
};

export default createTheme({
    spacing: 5,
    typography: {
        fontFamily: fontFamily.asap,
        button: {
            textTransform: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
            fontWeight: "inherit",
        },
        body1: {
            fontFamily: fontFamily.asap,
        },
        body2: {
            fontFamily: fontFamily.roboto,
        },
    },
    palette: {
        primary: {
            main: colors.primary,
            light: "#ffffff",
            dark: "#000000",
            contrastText: "#ffffff",
        },
        secondary: {
            main: colors.secondary,
            light: colors.secondary,
            dark: colors.secondaryDark,
            contrastText: colors.secondary,
        },
        neutral: {
            main: "#002C55",
            light: "#FBFBFB",
            dark: "#FBFBFB",
        },
        error: {
            dark: "#801B0E",
            main: "#D32F2F",
        },
        success: {
            main: "#FFFFFF",
            dark: "#FFFFFF",
            light: "#FFFFFF",
            contrastText: "#FFFFFF",
        },
        action: {
            active: "#FFFFFFF",
        },
        info: {
            main: "#A9A9A9",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#7E7E7E",
            disabled: "#b6b6b6",
        },
        grey: neutral,
        divider: neutral[100],
        background: {
            default: "#191A1C",
            paper: "#2C2B2D",
        },
        common: {
            white: "#1F1F1F",
            black: "#6b6a6a",
        },
        type: "light",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1080,
            lg: 1280,
            xl: 1920,
        },
    },
    overrides: {
        MuiGrid: {
            root: {
                fontFamily: fontFamily.asap,
            },
        },
        MuiButton: {
            root: {
                color: "#929293",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "0.8rem",
                paddingRight: "0.8rem",
            },
            text: {
                color: "#FFFFFF",
            },
            contained: {
                minWidth: "200px",
                "&:hover": {
                    backgroundColor: neutral[500],
                },
            },
            containedSecondary: {
                color: "#ffffff",
            },
        },
        MuiLink: {
            button: {
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
            },
        },
        MuiDropzoneArea: {
            root: {
                minHeight: "10rem",
            },
            text: {
                fontSize: "1rem",
                margin: "15px",
            },
        },
        MuiDropzonePreviewList: {
            imageContainer: {
                maxWidth: "20%",
                flexBasis: "20%",
            },
        },
        MuiTabs: {
            root: {
                justifyContent: "center",
                backgroundColor: "#FBFBFB",
                color: "black",
            },
            scroller: {
                flexGrow: 0,
            },
        },
        MuiAvatar: {
            colorDefault: {
                backgroundColor: "#676767",
            },
        },
        MuiInput: {
            root: {
                marginTop: "-10px",
                marginBottom: "10px",
                fontSize: "14px",
                color: "#FFFFFF",
            },
        },
        MuiFormLabel: {
            root: {
                color: "#FFFFFF",
                fontSize: "14px",
                "&:focus": {
                    color: "#FFFFFF",
                },
            },
        },
        MuiInputBase: {
            root: {
                color: "#FFFFFF",
                "&:focus": {
                    color: "#FFFFFF",
                },
            },
            input: {
                color: "#FFFFFF",
                "&:focused": {
                    color: "#FFFFFF",
                },
            },
        },
        MuiFormControl: {
            root: {
                margin: "0px",
                fontSize: "14px",
                color: "#FFFFFF",
            },
        },
        MuiOutlinedInput: {
            root: {
                color: "#FFFFFF",
            },
        },
        MuiInputLabel: {
            root: {
                color: "#FFFFFF",
            },
        },
        MuiMenuItem: {
            root: {
                backgroundColor: "#929293",
            },
        },
        MuiDialogActions: {
            root: {
                color: "#FFFFF",
            },
        },
        MuiButtonBase: {
            root: {
                color: "#FFFFFF",
            },
        },
    },
});

type OverridesNameToClassKey = {
    [Name in keyof MuiDropzoneNameToClassKey]?: Partial<StyleRules<MuiDropzoneNameToClassKey[Name]>>;
};
declare module "@material-ui/core/styles/overrides" {
    export interface ComponentNameToClassKey extends OverridesNameToClassKey {}
}

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
        neutral: Palette["primary"];
    }

    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }
}

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
