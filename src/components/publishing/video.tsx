import * as React from "react"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import url from "url"

const QUERYSTRING =
  "?title=0&portrait=0&badge=0&byline=0&showinfo=0&rel=0&controls=2&modestbranding=1&iv_load_policy=3&color=E5E5E5"

function getPlayerUrl(url) {
  if (url.hostname.indexOf("vimeo.com") > 0) {
    return "https://player.vimeo.com/video/"
  } else if (url.hostname.indexOf("youtu") > 0) {
    return "https://www.youtube.com/embed/"
  }
}

function getId(url) {
  if (url.hostname.indexOf("youtube.com") > 0) {
    return url.query.v
  } else {
    return url.split("/")[-1]
  }
}

interface VideoProps extends React.HTMLProps<HTMLIFrameElement> {
  size?: any
}

const Video: React.SFC<VideoProps> = props => {
  const { src } = props
  const { width } = props.size
  const parsedUrl = url.parse(src, true)
  const playerUrl = getPlayerUrl(parsedUrl)
  const id = getId(parsedUrl)
  const playerSrc = playerUrl + id + QUERYSTRING
  return <IFrame src={playerSrc} frameBorder={"0"} allowFullScreen height={width * 0.5625} />
}

Video.defaultProps = {
  size: {
    width: 500,
  },
}

const iframe: StyledFunction<React.HTMLProps<HTMLIFrameElement>> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
`

const sizeMeConfig = {
  monitorWidth: true,
  refreshRate: 64,
}

export default sizeMe(sizeMeConfig)(Video)
