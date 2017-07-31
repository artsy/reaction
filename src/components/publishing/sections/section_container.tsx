import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"

interface SectionContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

const Div: StyledFunction<SectionContainerProps> = styled.div

const SectionContainer = Div`
  display: flex;
  ${pMedia.sm`
    width: 100%;
  `}

`
export default SectionContainer
