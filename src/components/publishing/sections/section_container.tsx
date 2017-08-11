import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"

interface SectionContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

const Div: StyledFunction<SectionContainerProps> = styled.div

const chooseWidth = layout => {
  if (layout) {
    if (layout === "overflow_fillwidth") {
      return "780px;"
    } else if (layout === "fillwidth") {
      return "100%;"
    } else if (layout === "blockquote") {
      return "900px;"
    }
  }
  return "680px;"
}

const chooseMobilePadding = layout => {
  if (layout) {
    if (layout === "overflow_fillwidth" || layout === "blockquote") {
      return "20px;"
    } else if (layout === "fillwidth") {
      return "0px;"
    }
  }
  return "20px;"
}

const SectionContainer = Div`
  box-sizing: border-box;
  display: flex;
  max-width: ${props => chooseWidth(props.layout)}
  width: 100%;
  margin: auto;
  margin-bottom: 40px;
  ${props => pMedia.sm`
    max-width: 100%;
    padding: ${chooseMobilePadding(props.layout)}
    margin: 0px;
  `}
`
export default SectionContainer
