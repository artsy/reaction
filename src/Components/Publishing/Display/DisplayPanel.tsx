import { get, once } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../Assets/Colors"
import { crop, resize } from "../../../Utils/resizer"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { VideoControls } from "../Sections/VideoControls"

interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  campaign: any
  isMobile?: boolean
  unit: any
}

interface DivUrlProps extends React.HTMLProps<HTMLDivElement> {
  coverUrl?: string
  hoverImageUrl?: string
  isMobile?: boolean
  imageUrl?: string
  onClick: any
  onMouseEnter: any
  onMouseLeave: any
}

@track()
export class DisplayPanel extends React.Component<DisplayPanelProps, any> {
  public video: HTMLVideoElement

  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.onClickVideo = this.onClickVideo.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

    this.state = {
      isPlaying: false
    }
  }

  @track(once(props => ({
    action: "Impression",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  })))
  componentDidMount() {
    if (this.video) {
      this.video.onended = () => {
        this.pauseVideo()
      }
    }
  }

  isVideoClickArea(e) {
    const videoClasses = [
      "VideoContainer",
      "VideoContainer__VideoCover",
      "VideoContainer__VideoControls",
      "VideoContainer__video",
      "PlayButton",
      "PlayButton__PlayButtonCaret"
    ]
    const isVideoClickArea = videoClasses.some(c => e.target.className.includes(c))
    return isVideoClickArea
  }

  @track((props, [e]) => ({
    action: "Click",
    label: "Display ad clickthrough",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  openLink(e) {
    e.preventDefault()
    const url = get(this.props, "unit.link.url", false)

    if (url && !this.isVideoClickArea(e)) {
      this.pauseVideo()
      window.open(url, "_blank")
    }
  }

  @track(props => ({
    action: "Click",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  onClickVideo(e) {
    if (this.isVideoClickArea(e)) {
      this.toggleVideo()
    }
  }

  @track(props => ({
    action: "MouseEnter",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  onMouseEnter() {
    this.playVideo()
  }

  onMouseLeave = () => {
    this.pauseVideo()
  }

  playVideo = () => {
    if (this.video) {
      this.video.play()

      this.setState({
        isPlaying: true
      })
    }
  }

  pauseVideo = () => {
    if (this.video) {
      this.video.pause()

      this.setState({
        isPlaying: false
      })
    }
  }

  toggleVideo = () => {
    if (this.state.isPlaying) {
      this.pauseVideo()
    } else {
      this.playVideo()
    }
  }

  renderVideo = (url) => {
    const { isMobile } = this.props

    return (
      <VideoContainer className="VideoContainer">
        {!this.state.isPlaying &&
          <VideoCover className="VideoContainer__VideoCover">
            {isMobile &&
              <VideoControls mini
                className="VideoContainer__VideoControls"
              />
            }
          </VideoCover>
        }

        <video playsInline
          src={url}
          className="VideoContainer__video"
          controls={false}
          ref={video => (this.video = video)}
        />
      </VideoContainer>
    )
  }

  render() {
    const { unit, campaign, isMobile } = this.props
    const url = get(unit.assets, "0.url", "")
    const cover = unit.cover_image_url || ""
    const imageUrl = crop(url, { width: 680, height: 284 })
    const hoverImageUrl = resize(unit.logo, { width: 680 })
    const coverUrl = crop(cover, { width: 680, height: 284 })
    const isVideo = url.includes("mp4")

    return (
      <Wrapper onClick={!isMobile && this.openLink}>
        <DisplayPanelContainer
          className="DisplayPanel__DisplayPanelContainer"
          onClick={isMobile && this.onClickVideo}
          onMouseEnter={!isMobile && isVideo && this.onMouseEnter}
          onMouseLeave={!isMobile && isVideo && this.onMouseLeave}
          imageUrl={imageUrl}
          isMobile={isMobile}
          hoverImageUrl={hoverImageUrl}
          coverUrl={coverUrl}>

          {isVideo
            ? this.renderVideo(url)
            : <Image />
          }

          <div onClick={isMobile && this.openLink}>
            <Headline>
              {unit.headline}
            </Headline>

            <Body dangerouslySetInnerHTML={{
              __html: unit.body
            }} />

            <SponsoredBy>
              {`Sponsored by ${campaign.name}`}
            </SponsoredBy>
          </div>
        </DisplayPanelContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: black;
`

const Image = styled.div`
  margin-bottom: 15px;
  width: 100%;
  height: 142px;
  background-color: black;
  box-sizing: border-box;
`

const VideoCover = Image.extend`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Div: StyledFunction<DivUrlProps> = styled.div

const DisplayPanelContainer = Div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  padding: 20px;
  max-width: 360px;
  box-sizing: border-box;
  ${Image} {
    background: url(${props => (props.imageUrl ? props.imageUrl : "")}) no-repeat center center;
    background-size: cover;
  }
  ${VideoCover} {
    background: url(${props => (props.coverUrl ? props.coverUrl : "")}) no-repeat center center;
    background-size: cover;
  }
  &:hover {
    ${Image} {
      ${props =>
    props.hoverImageUrl
      ? `
          background: black url(${props.hoverImageUrl}) no-repeat center center;
          background-size: contain;
          border: 10px solid black;
        `
      : ""}
    }
    ${VideoCover} {
      ${props => !props.isMobile && "display: none;"}
    }
  }

  ${pMedia.md`
    margin: auto;
  `}

  ${pMedia.sm`
    margin: auto;
  `}

  ${pMedia.xs`
    margin: auto;
  `}
`
DisplayPanelContainer.displayName = "DisplayPanelContainer"

const Headline = styled.div`
  ${Fonts.unica("s16", "medium")} line-height: 1.23em;
  margin-bottom: 3px;
`

const Body = styled.div`
  ${Fonts.garamond("s17")} line-height: 1.53em;
  margin-bottom: 20px;
  a {
    color: black;
  }
`

const SponsoredBy = styled.div`
  ${Fonts.avantgarde("s11")} color: ${Colors.grayRegular};
`

const VideoContainer = Image.extend`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  video {
    object-fit: cover;
    object-position: 50%;
    width: 100%;
    height: 100%;
  }
`

// Set names for tests and DOM
DisplayPanelContainer.displayName = "DisplayPanelContainer"
Image.displayName = "Image"
VideoContainer.displayName = "VideoContainer"
VideoCover.displayName = "VideoCover"
Wrapper.displayName = "Wrapper"

