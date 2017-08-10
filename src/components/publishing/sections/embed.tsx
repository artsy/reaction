import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"

interface EmbedProps {
  section: any
}

const Embed: React.SFC<EmbedProps> = props => {
  const { url, height, mobile_height } = props.section
  return <IFrame src={url} scrolling="no" frameBorder="0" height={height} mobileHeight={mobile_height} />
}

interface FrameProps extends React.HTMLProps<HTMLIFrameElement> {
  mobileHeight?: number
  height: number
}

const iframe: StyledFunction<FrameProps> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
  ${props => pMedia.xs`
    height: ${props.mobileHeight}px;
  `}
`

export default Embed
