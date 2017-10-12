import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"

interface FillwidthItemProps extends React.HTMLProps<HTMLDivElement> {
  margin?: number
  width?: number
}

const div: StyledFunction<FillwidthItemProps & React.HTMLProps<HTMLDivElement>> = styled.div

export const ImageCollectionItem = div`
  margin-right: ${props => (props.margin ? props.margin + "px" : "0px")};
  width: ${props => (props.width ? props.width + "px" : "100%")};
  ${pMedia.xs`
    margin-bottom: 10px;
  `}
`
