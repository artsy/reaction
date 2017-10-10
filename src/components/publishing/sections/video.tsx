import * as React from "react"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import urlParser from "url"
import { resize } from "../../../utils/resizer"
import { sizeMeRefreshRate } from "../constants"
import { Layout } from "../typings"
import Caption from "./caption"

const QUERYSTRING =
  "?title=0&portrait=0&badge=0&byline=0&showinfo=0&rel=0&controls=2&modestbranding=1&iv_load_policy=3&color=E5E5E5"
const videoRatio = 0.5625

function getPlayerUrl(url) {
  if (url.hostname.indexOf("vimeo.com") > -1) {
    return "https://player.vimeo.com/video/"
  } else if (url.hostname.indexOf("youtu") > -1) {
    return "https://www.youtube.com/embed/"
  }
}

function getId(url) {
  if (url.hostname.indexOf("youtube.com") > 0) {
    return url.query.v
  } else {
    return url.pathname.split("/").pop()
  }
}

interface VideoProps {
  section: {
    url: string
    caption?: string
    cover_image_url?: string
  }
  size?: any
  layout?: Layout
}

interface VideoState {
  src: string
  hidden: boolean
}

class Video extends React.Component<VideoProps, VideoState> {
  static defaultProps = {
    size: {
      width: 500,
    },
  }

  constructor(props) {
    super(props)
    const { url } = this.props.section
    const parsedUrl = urlParser.parse(url, true)
    const playerUrl = getPlayerUrl(parsedUrl)
    const id = getId(parsedUrl)
    const playerSrc = playerUrl + id + QUERYSTRING
    this.state = { src: playerSrc, hidden: false }
  }

  playVideo = () => {
    const playerSrc = this.state.src + "&autoplay=1"
    this.setState({ src: playerSrc, hidden: true })
  }

  render() {
    const { caption, cover_image_url } = this.props.section
    const { width } = this.props.size
    const src = resize(cover_image_url, { width: 1200 })
    return (
      <VideoContainer>
        <CoverImage src={src} height={width * videoRatio} onClick={this.playVideo} hidden={this.state.hidden}>
          <PlayButton><PlayButtonCaret /></PlayButton>
        </CoverImage>
        <IFrame src={this.state.src} frameBorder="0" allowFullScreen height={width * videoRatio} />
        <Caption caption={caption} layout={this.props.layout}>
          {this.props.children}
        </Caption>
      </VideoContainer>
    )
  }
}

const iframe: StyledFunction<React.HTMLProps<HTMLIFrameElement>> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
`

interface CoverImageProps {
  src: string
  height?: number
}
const VideoContainer = styled.div`
  width: 100%;
  position: relative;
`
const Div: StyledFunction<CoverImageProps & React.HTMLProps<HTMLDivElement>> = styled.div
const CoverImage = Div`
  display: ${props => (props.hidden || !props.src ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => props.height + "px"};
  position: absolute;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
`

const PlayButtonCaret = styled.div`
  color: black;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 30px solid black;
`

const PlayButton = styled.div`
  background: white;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  border: 0;
  outline: 0;
`

const sizeMeOptions = {
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

export default sizeMe(sizeMeOptions)(Video)
