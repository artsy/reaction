import { css } from "styled-components"
import * as fonts from "../../assets/fonts"

const textSizesForGaramond = {
  s15: {
    size: "15px",
    height: "1.25em",
  },
  s17: {
    size: "17px",
    height: "1.1em",
  },
  s23: {
    size: "23px",
    height: "1.5em",
  },
  s40: {
    size: "40px",
    height: "1.1em",
  },
  s50: {
    size: "50px",
    height: "1.1em",
  },
}

const textSizesForUnica = {
  s14: {
    size: "14px",
    height: "1.1em",
  },
  s19: {
    size: "19px",
    height: "1.5em",
  },
  s40: {
    size: "40px",
    height: "1.1em",
  },
  s69: {
    size: "69px",
    height: "1em",
  },
  s80: {
    size: "80px",
    height: "1.1em",
  },
  s100: {
    size: "100px",
    height: "1.1em",
  },
  s130: {
    size: "130px",
    height: "1.1em",
  },
}

const textSizesForAvantGarde = {
  s11: {
    size: "11px",
    height: "1.1em",
  },
  s13: {
    size: "13px",
    height: "1.1em",
  },
}

const unicaFontFamily = `
  'Unica77LLWebRegular',
  'Arial',
  'serif'
`

const unica = size => {
  const evaluatedSize = textSizesForUnica[size]
  const style = css`
    font-family: ${unicaFontFamily};
    -webkit-font-smoothing: antialiased;
    size: ${evaluatedSize.size};
    line-height: ${evaluatedSize.height};
  `
  return style
}

const avantgarde = size => {
  const style = fonts.primary.style
  const sizeStyles = css`
    size: ${textSizesForAvantGarde[size].size};
    line-height: ${textSizesForAvantGarde[size].height};
  `
  return style.concat(sizeStyles)
}

const garamond = size => {
  const style = fonts.secondary.style
  const sizeStyles = css`
    size: ${textSizesForGaramond[size].size};
    line-height: ${textSizesForGaramond[size].height};
  `
  return style.concat(sizeStyles)
}

const Fonts = {
  garamond,
  avantgarde,
  unica,
}

export default Fonts
