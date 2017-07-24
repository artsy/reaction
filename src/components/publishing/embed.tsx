import * as React from "react"
import styled, { StyledFunction } from "styled-components"

interface EmbedProps {
  section: any
}

interface FrameProps extends React.HTMLProps<HTMLIFrameElement> {
  mobileHeight?: number
  height: number
}

const iframe: StyledFunction<FrameProps & React.HTMLProps<HTMLIFrameElement>> = styled.iframe

const Embed: React.SFC<EmbedProps> = props => {
  const { url, height, mobile_height } = props.section
  return <IFrame src={url} scrolling="no" frameBorder="0" height={height} mobileHeight={mobile_height} />
}

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
  @media (max-width: 600px) {
    height: ${props => props.mobileHeight + "px"};
  }
`

export default Embed
