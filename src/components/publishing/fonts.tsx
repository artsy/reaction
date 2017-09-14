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
  s19: {
    size: "19px",
    height: "1.5em",
  },
  s23: {
    size: "23px",
    height: "1.5em",
  },
  s28: {
    size: "28px",
    height: "1.2em",
  },
  s30: {
    size: "30px",
    height: "1.25em",
  },
  s34: {
    size: "34px",
    height: "1.1em",
  },
  s37: {
    size: "37px",
    height: "1.2em",
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
  s12: {
    size: "12px",
    height: "1.4em",
  },
  s14: {
    size: "14px",
    height: "1.4em",
  },
  s16: {
    size: "16px",
    height: "1.1em",
  },
  s19: {
    size: "19px",
    height: "1.5em",
  },
  s32: {
    size: "32px",
    height: "1.1em",
  },
  s34: {
    size: "34px",
    height: "1.1em",
  },
  s40: {
    size: "40px",
    height: "1.1em",
  },
  s45: {
    size: "45px",
    height: "1.2em",
  },
  s65: {
    size: "65px",
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

const fontFamilyForUnica = {
  regular: "Unica77LLWebRegular",
  italic: "Unica77LLWebItalic",
  medium: "Unica77LLWebMedium",
  mediumItalic: "Unica77LLWebMediumItalic",
}

const unicaFontFamily = family => {
  return (
    fontFamilyForUnica[family] +
    ` ,
      'Arial',
      'serif'
    `
  )
}

const textSizesForAvantGarde = {
  s11: {
    size: "11px",
    height: "1.65em",
  },
  s13: {
    size: "13px",
    height: "1.65em",
  },
}

const unica = (size, family = "regular") => {
  const evaluatedSize = textSizesForUnica[size]
  const style = css`
    font-family: ${unicaFontFamily(family)};
    -webkit-font-smoothing: antialiased;
    font-size: ${evaluatedSize.size};
    line-height: ${evaluatedSize.height};
  `
  return style
}

const avantgarde = size => {
  const style = fonts.primary.style
  const sizeStyles = css`
    font-size: ${textSizesForAvantGarde[size].size};
    line-height: ${textSizesForAvantGarde[size].height};
    letter-spacing: 1px;
  `
  return style.concat(sizeStyles)
}

const garamond = size => {
  const style = fonts.secondary.style
  const sizeStyles = css`
    font-size: ${textSizesForGaramond[size].size};
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
