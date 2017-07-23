import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../helpers"

interface EmbedProps extends React.HTMLProps<HTMLIFrameElement> {
  mobileHeight?: number
  height: number
}

const Embed: React.SFC<EmbedProps> = props => {
  const { src, height, mobileHeight } = props
  return <IFrame src={src} scrolling="no" frameBorder="0" height={height} mobileHeight={mobileHeight} />
}

const iframe: StyledFunction<EmbedProps & React.HTMLProps<HTMLIFrameElement>> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
  ${pMedia.sm`
    height: ${props => props.mobileHeight + "px"};
  `}
`

export default Embed
