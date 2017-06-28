import * as React from "react"
import styled, { css } from "styled-components"
import * as fonts from "../../assets/fonts"

type FontFamily = "garamond" | "unica" | "avantgarde"
type FontSize = "t11" | "t13" | "t14" | "t17" | "t19" | "t23" | "t40" | "t50" | "t69" | "t80" | "t100" | "t130"

interface FontProps extends React.HTMLProps<HTMLParagraphElement> {
  family?: FontFamily
  size?: FontSize
  color?: string
}

const unicaFontFamily = `
  'Unica 77',
  'Arial',
  'serif'
`

const unica = {
  fontFamily: unicaFontFamily,
  style: css`
    font-family: ${unicaFontFamily};
    -webkit-font-smoothing: antialiased;
  `,
}

const textSizesForGaramond = {
  t17: {
    size: "17px",
    height: "1.1em",
  },
  t23: {
    size: "23px",
    height: "1.5em",
  },
  t40: {
    size: "40px",
    height: "1.1em",
  },
  t50: {
    size: "50px",
    height: "1.1em",
  },
}

const textSizesForUnica = {
  t14: {
    size: "14px",
    height: "1.1em",
  },
  t19: {
    size: "19px",
    height: "1.5em",
  },
  t40: {
    size: "40px",
    height: "1.1em",
  },
  t69: {
    size: "69px",
    height: "1em",
  },
  t80: {
    size: "80px",
    height: "1.1em",
  },
  t100: {
    size: "100px",
    height: "1.1em",
  },
  t130: {
    size: "130px",
    height: "1.1em",
  },
}

const textSizesForAvantGarde = {
  t11: {
    size: "11px",
    height: "1.1em",
  },
  t13: {
    size: "13px",
    height: "1.1em",
  },
}

const TextStyleToTextSize = {
  garamond: textSizesForGaramond,
  unica: textSizesForUnica,
  avantgarde: textSizesForAvantGarde,
}

const textStyleNameToCss = {
  garamond: fonts.secondary.style,
  unica,
  avantgarde: fonts.primary.style,
}

const RawText: React.SFC<FontProps> = props =>
  <span className={props.className}>
    {props.children}
  </span>

const Font = styled(RawText)`
  font-size: ${props => TextStyleToTextSize[props.family][props.size].size};
  line-height: ${props => TextStyleToTextSize[props.family][props.size].height};
  color: ${props => props.color};
  ${props => textStyleNameToCss[props.family]};
`

Font.defaultProps = {
  size: "t23",
  family: "garamond",
  color: "black",
}

export default Font
