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

const SectionContainer = Div`
  display: flex;
  width: ${props => chooseWidth(props.layout)}
  ${pMedia.sm`
    width: 100%;
  `}
`
export default SectionContainer
