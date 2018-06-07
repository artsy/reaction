import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { color, maxWidth, space, textAlign, themeGet } from "styled-system"

const dynamicTheme = callback => props =>
  themeGet.apply(null, [].concat(callback(props)))(props)

const selectFontType = ({ weight = "regular", italic }) => {
  if (italic) {
    if (weight === "medium") {
      return "mediumItalic"
    }
    return "italic"
  }
  return weight
}

const fontPath = props => [
  `fontFamily.${props.family}.${selectFontType(props)}`,
  "regular", // fallback
]

const fontSize = props => `typeSizes.${props.typeSize}.fontSize`
const lineHeight = props => `typeSizes.${props.typeSize}.lineHeight`

const StyledText = styled.div`
  font-family: ${dynamicTheme(fontPath)};
  font-size: ${dynamicTheme(fontSize)}px;
  line-height: ${dynamicTheme(lineHeight)}px;
  ${color};
  ${maxWidth};
  ${space};
  ${textAlign};
`

const propTypes = {
  size: PropTypes.string,
  weight: PropTypes.string,
  italics: PropTypes.bool,
}

const defaultProps = {
  size: "4",
  weight: "medium",
  italic: false,
}

// Example: <Sans size="2" weight="medium" italic>

export const Sans: any = props => (
  <StyledText family="unica" typeSize={`sans${props.size || 4}`} {...props} />
)

export const Serif: any = props => (
  <StyledText
    family="garamond"
    typeSize={`serif${props.size || 4}`}
    {...props}
  />
)

export const Display = props => (
  <StyledText
    family="avantgarde"
    typeSize={`display${props.size}`}
    {...props}
  />
)
;[Sans, Serif, Display].forEach(TypeStyle => {
  TypeStyle.propTypes = propTypes
  TypeStyle.defaultProps = defaultProps
})
