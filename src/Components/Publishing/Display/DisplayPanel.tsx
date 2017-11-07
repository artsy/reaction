import { get, memoize, once } from "lodash"
import React, { Component, HTMLProps  } from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../Assets/Colors"
import { crop, resize } from "../../../Utils/resizer"
import { track } from "../../../Utils/track"
import { pMedia as breakpoint } from "../../Helpers"
import { Fonts } from "../Fonts"
import { VideoControls } from "../Sections/VideoControls"

interface Props extends React.HTMLProps<HTMLDivElement> {
  campaign: any
  isMobile?: boolean
  unit: any
  tracking?: any
}

interface State {
  isPlaying: boolean
  showCoverImage: boolean
}

@track()
export class DisplayPanel extends Component<Props, State> {
  public video: HTMLVideoElement

  state = {
    isPlaying: false,
    showCoverImage: false
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleVideoClick = this.handleVideoClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  @track(once(props => ({
    action: "Impression",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  })))
  componentDidMount() {
    if (this.video) {
      this.video.onended = this.pauseVideo
    }
  }

  componentWillUpdate() {
    if (this.video) {
      this.video.removeEventListener("timeupdate", this.trackProgress)
    }
  }

  componentDidUpdate() {
    if (this.video) {
      this.video.addEventListener("timeupdate", this.trackProgress)
    }
  }

  // TODO: This could be shared with <CanvasVideo />
  trackProgress = () => {
    const secondsComplete = Math.floor(this.video.currentTime)
    const percentComplete = Math.floor(this.video.currentTime / this.video.duration * 100)
    const percentCompleteInterval = Math.floor(percentComplete / 25) * 25

    // Track 25% duration intervals
    if (percentCompleteInterval > 0) {
      this.trackDuration(percentCompleteInterval)
    }

    // Track 3 & 10 seconds
    if (secondsComplete === 3 || secondsComplete === 10) {
      this.trackSeconds(secondsComplete)
    }
  }

  trackDuration = memoize((percentComplete) => {
    this.props.tracking.trackEvent({
      action: "Video duration",
      label: "Display ad video duration",
      percent_complete: percentComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "panel"
    })
  })

  trackSeconds = memoize((secondsComplete) => {
    this.props.tracking.trackEvent({
      action: "Video seconds",
      label: "Display ad video seconds",
      seconds_complete: secondsComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "panel"
    })
  })

  isWithinMediaArea(event) {
    const valid = [
      "DisplayPanel__Image",
      "VideoContainer",
      "VideoContainer__VideoCover",
      "VideoContainer__VideoControls",
      "VideoContainer__video",
      "PlayButton",
      "PlayButton__PlayButtonCaret"
    ]
    const withinMediaArea = valid.some(className => event.target.className.includes(className))
    return withinMediaArea
  }

  /**
   * Handle clicks to main container
   */
  @track(props => ({
    action: "Click",
    label: "Display ad clickthrough",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  handleClick(event) {
    event.preventDefault()
    const { showCoverImage: alreadyClicked } = this.state
    const { isMobile, unit } = this.props
    const url = get(unit, "link.url", false)
    const isVideo = this.isVideo()
    const openUrl = () => window.open(url, "_blank")

    if (isMobile) {
      if (isVideo) {
        if (this.isWithinMediaArea(event)) {
          this.toggleVideo()
        } else {
          openUrl()
        }
        // Image
      } else {
        if (this.isWithinMediaArea(event)) {
          if (alreadyClicked) {
            openUrl()
            this.toggleCoverImage()
          } else {
            this.toggleCoverImage()
          }
          // Clicked outside of the media area
        } else {
          openUrl()
        }
      }
      // Desktop
    } else {
      if (isVideo) {
        this.pauseVideo()
      }
      openUrl()
    }
  }

  /**
   * Handle clicks to Video player
   */
  @track(props => ({
    action: "Click",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  handleVideoClick(event) {
    // noop
  }

  /**
   * Handle MouseEnter, on desktop
   */
  @track(props => ({
    action: "MouseEnter",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "panel"
  }))
  handleMouseEnter() {
    if (this.props.isMobile) {
      return false
    } else {
      if (this.isVideo()) {
        this.playVideo()
      } else {
        this.toggleCoverImage()
      }
    }
  }

  /**
   * Handle MouseLeave, on desktop
   */
  handleMouseLeave() {
    if (this.props.isMobile) {
      return false
    } else {
      if (this.isVideo()) {
        this.pauseVideo()
      } else {
        this.toggleCoverImage()
      }
    }
  }

  toggleCoverImage() {
    const showCoverImage = !this.state.showCoverImage

    this.setState({
      showCoverImage
    })
  }

  toggleVideo() {
    if (this.state.isPlaying) {
      this.pauseVideo()
    } else {
      this.playVideo()
    }
  }

  pauseVideo() {
    if (this.video) {
      this.video.pause()

      this.setState({
        isPlaying: false
      })
    }
  }

  playVideo() {
    if (this.video) {
      this.video.play()

      this.setState({
        isPlaying: true
      })
    }
  }

  isVideo() {
    const assetUrl = get(this.props.unit, "assets.0.url", "")
    const isVideo = assetUrl.includes("mp4")
    return isVideo
  }

  renderVideo(url) {
    const { isPlaying } = this.state
    const { isMobile } = this.props

    return (
      <VideoContainer onClick={this.handleVideoClick} className="VideoContainer">
        {!isPlaying &&
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
    const { showCoverImage } = this.state
    const { unit, campaign, isMobile } = this.props
    const url = get(unit.assets, "0.url", "")
    const isVideo = this.isVideo()
    const cover = unit.cover_image_url || ""
    const imageUrl = crop(url, { width: 680, height: 284 })
    const hoverImageUrl = resize(unit.logo, { width: 680 })
    const coverUrl = crop(cover, { width: 680, height: 284 })

    return (
      <Wrapper
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <DisplayPanelContainer
          className='DisplayPanel__DisplayPanelContainer'
          imageUrl={imageUrl}
          isMobile={isMobile}
          hoverImageUrl={hoverImageUrl}
          coverUrl={coverUrl}
          showCoverImage={showCoverImage}>

          {isVideo
            ? this.renderVideo(url)
            : <Image
                className='DisplayPanel__Image'
              /> }

          <div>
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

interface DivUrlProps extends HTMLProps<HTMLDivElement> {
  coverUrl?: string
  hoverImageUrl?: string
  isMobile?: boolean
  imageUrl?: string
  showCoverImage?: boolean
}

const div: StyledFunction<DivUrlProps> = styled.div

const Wrapper = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: black;
  max-width: 360px;

  ${breakpoint.sm`
    margin: 0 auto;
  `}
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

const DisplayPanelContainer = div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  padding: 20px;
  max-width: 360px;
  box-sizing: border-box;

  ${Image} {
    background: url(${p => (p.imageUrl || "")}) no-repeat center center;
    background-size: cover;

    ${p => p.showCoverImage && p.hoverImageUrl && `
      background: black url(${p.hoverImageUrl}) no-repeat center center;
      background-size: contain;
      border: 10px solid black;
    `}
  }

  ${VideoCover} {
    background: url(${p => (p.coverUrl || "")}) no-repeat center center;
    background-size: cover;

    ${p => p.showCoverImage && !p.isMobile && `
      display: none;
    `}
  }

  ${breakpoint.md`
    margin: auto;
  `}

  ${breakpoint.sm`
    margin: auto;
  `}

  ${breakpoint.xs`
    margin: auto;
  `}
`

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

