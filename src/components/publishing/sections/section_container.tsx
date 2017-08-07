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
    }
  }
  return "680px;"
}

const chooseMargin = layout => {
  if (layout) {
    if (layout === "overflow_fillwidth") {
      return "auto;"
    } else if (layout === "fillwidth") {
      return "auto;"
    }
  }
  return "auto;"
}

const chooseMobilePadding = layout => {
  if (layout) {
    if (layout === "overflow_fillwidth") {
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
  width: ${props => chooseWidth(props.layout)}
  margin: ${props => chooseMargin(props.layout)}
  ${props => pMedia.sm`
    width: 100%;
    padding: ${chooseMobilePadding(props.layout)}
    margin: 0px;
  `}
`
export default SectionContainer
