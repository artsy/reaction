import React from "react"
import reset from "styled-reset"
import { ThemeProvider } from "styled-components"
import { GridThemeProvider, injectLayoutBaseCSS } from "styled-bootstrap-grid"

// API: https://jxnblk.com/styled-system/api
// Table: https://jxnblk.com/styled-system/table

export const theme = {
  borders: [0, "2px solid"],

  // buttonStyle util
  buttons: {
    primary: {
      color: "purple100",
      backgroundColor: "black",
    },
  },

  // https://www.notion.so/artsy/Color-a0c24896daf8433d9409aee2146ac267
  colors: {
    text: "#000",
    black100: "#000",
    black80: "#333",
    black60: "#666",
    black30: "#C2C2C2",
    black10: "#E5E5E5",
    black5: "#F8F8F8",
    purple100: "#6E1EFF",
    purple30: "#D3BBFF",
    green100: "#0EDA83",
    red100: "#F7625A",
    yellow100: "#F1AF1B",
    yellow30: "#FAE7BA",
    yellow10: "#FDF7E8",
    white100: "#FFF",
  },

  fontFamily: {
    unica: {
      regular: "Unica77LL-Regular",
      italic: "Unica77LL-Italic",
      medium: "Unica77LL-Medium",
      mediumItalic: "Unica77LL-MediumItalic",
    },
    avantgarde: {
      regular: "AvantGardeGothicITC",
    },
    garamond: {
      regular: "AGaramondPro-Regular",
      italic: "AGaramondPro-Italic",
      semibold: "AGaramondPro-Semibold",
    },
  },

  // https://github.com/dragma/Elements/Grid#props-definition
  // https://www.notion.so/artsy/Grid-e489a52e26bd4319b6ee7898044a8a53
  grid: {
    breakpoints: {
      giant: 1200,
      xl: 1200,
      desktop: 992,
      lg: 992,
      tablet: 768,
      md: 768,
      phone: 576,
      sm: 576,
      smaller: 575,
      xs: 575,
    },
    container: {
      padding: 40,
    },
    row: {
      padding: 15,
    },
    col: {
      padding: 15,
    },
  },

  // https://www.notion.so/artsy/Spacing-93eeaed9fdf9480099fec7094fd1b9f3
  space: [
    0, // 0
    3, // 1
    5, // 2
    10, // 3
    20, // 4
    30, // 5
    40, // 6
    60, // 7
    90, // 8
    120, // 9
    180, // 10
  ],

  textStyles: {
    caps: {
      textTransform: "uppercase",
    },
  },

  // https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221
  typeSizes: {
    sans1: {
      fontSize: 10,
      lineHeight: 14,
    },
    sans2: {
      fontSize: 12,
      lineHeight: 16,
    },
    sans3: {
      fontSize: 14,
      lineHeight: 24,
    },
    serif1: {
      fontSize: 12,
      lineHeight: 16,
    },
    serif2: {
      fontSize: 14,
      lineHeight: 18,
    },
    serif10: {
      fontSize: 44,
      lineHeight: 50,
    },
  },
}

// FIXME: Manage this more systematically
injectGlobalCSS()

export function injectGlobalCSS() {
  injectLayoutBaseCSS(`
    ${reset};

    html,
    body,
    #root {
      height: 100%;
    }
    body {
      margin: 0;
      padding: 0;
    }

    @font-face {
      font-family: Unica77LL-Regular;
      src: url(/assets/fonts/Unica77LL-Regular.otf);
    }

    @font-face {
      font-family: Unica77LL-Italic;
      src: url(/assets/fonts/Unica77LL-Italic.otf);
    }

    @font-face {
      font-family: Unica77LL-Medium;
      src: url(/assets/fonts/Unica77LL-Medium.otf);
    }

    @font-face {
      font-family: Unica77LL-MediumItalic;
      src: url(/assets/fonts/Unica77LL-MediumItalic.otf);
    }

    @font-face {
      font-family: AGaramondPro-Bold;
      src: url(/assets/fonts/AGaramondPro-Bold.otf);
    }

    @font-face {
      font-family: AGaramondPro-BoldItalic;
      src: url(/assets/fonts/AGaramondPro-BoldItalic.otf);
    }

    @font-face {
      font-family: AGaramondPro-Italic;
      src: url(/assets/fonts/AGaramondPro-Italic.otf);
    }

    @font-face {
      font-family: AGaramondPro-Regular;
      src: url(/assets/fonts/AGaramondPro-Regular.otf);
    }

    @font-face {
      font-family: AGaramondPro-Semibold;
      src: url(/assets/fonts/AGaramondPro-Semibold.otf);
    }

    @font-face {
      font-family: AvantGardeGothicITC;
      src: url(/assets/fonts/AVG65lig.otf);
    }
  `)
}

export const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={theme.grid}>
        {props.children}
      </GridThemeProvider>
    </ThemeProvider>
  )
}
