import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../helpers"

interface EmbedProps extends React.HTMLProps<HTMLIFrameElement> {
  mobileHeight?: number
  layout?: string
}

const Embed: React.SFC<EmbedProps> = props => {
  const { src } = props
  return <iframe src={src} scrolling="no" frameBorder="0" />
}

export default styled(Embed)`
  width: 100%;
  ${pMedia.sm`
    height: ${props => props.mobileHeight};
  `}
`
