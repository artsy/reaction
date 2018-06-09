import { css } from "styled-components"
import { themeGet } from "styled-system"

export const Body = () => css`
  div {
    font-family: ${themeGet("fontFamily.garamond.regular")};
    font-size: ${themeGet("typeSizes.serif3.fontSize")}px;
    line-height: ${themeGet("typeSizes.serif3.lineHeight")}px;
  }
`
