import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../helpers"

interface FillwidthItemProps extends React.HTMLProps<HTMLDivElement> {
  width?: any
  height?: any
  margin?: number
  key: string
}

const div: StyledFunction<FillwidthItemProps & React.HTMLProps<HTMLDivElement>> = styled.div

export default div`
  margin-right: ${props => (props.margin ? props.margin + "px" : "0px")};
  width: ${props => (props.width ? props.width + "px" : "100%")};
  height: ${props => (props.height ? props.height + "px" : "auto")};
  ${pMedia.sm`
    margin-bottom: 10px;
  `}
`
