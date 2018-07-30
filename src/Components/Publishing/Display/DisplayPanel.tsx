import { avantgarde, garamond, unica } from "Assets/Fonts"
import { get, memoize } from "lodash"
import React, { Component, HTMLProps } from "react"
import track from "react-tracking"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import Colors from "../../../Assets/Colors"
import Events from "../../../Utils/Events"
import { crop, resize } from "../../../Utils/resizer"
import { ErrorBoundary } from "../../ErrorBoundary"
import { pMedia as breakpoint } from "../../Helpers"
import { getCurrentUnixTimestamp } from "../Constants"
import { VideoControls } from "../Sections/VideoControls"
import { PixelTracker, replaceWithCacheBuster } from "./ExternalTrackers"
import { trackImpression } from "./track-once"

export interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  campaign: any
  article?: any
  isMobile?: boolean
  unit: any
  tracking?: any
  renderTime?: number
}

export interface DisplayPanelState {
  isPlaying: boolean
  isMuted: boolean
  showCoverImage: boolean
}

interface DivUrlProps extends HTMLProps<HTMLDivElement> {
  coverUrl?: string
  hoverImageUrl?: string
  isMobile?: boolean
  imageUrl?: string
  showCoverImage?: boolean
}

@track(
  { page: "Article" },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class DisplayPanel extends Component<
  DisplayPanelProps,
  DisplayPanelState
> {
  public video: HTMLVideoElement

  state = {
    isMuted: true,
    isPlaying: false,
    showCoverImage: false,
  }

  static defaultProps = {
    tracking: {
      trackEvent: x => x,
    },
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.trackImpression = this.trackImpression.bind(this)
  }

  componentDidMount() {
    if (this.video) {
      this.video.onended = this.pauseVideo
    }
  }

  componentWillUpdate() {
    if (this.video) {
      this.video.removeEventListener(
        "timeupdate",
        this.trackProgress.bind(this)
      )
    }
  }

  componentDidUpdate() {
    if (this.video) {
      this.video.addEventListener("timeupdate", this.trackProgress.bind(this))
      this.video.muted = this.state.isMuted
    }
  }

  @trackImpression(() => "panel")
  trackImpression() {
    // noop
  }

  // TODO: This could be shared with <CanvasVideo />
  trackProgress() {
    const secondsComplete = Math.floor(this.video.currentTime)
    const percentComplete = Math.floor(
      (this.video.currentTime / this.video.duration) * 100
    )
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

  trackDuration: Function = memoize(percentComplete => {
    this.props.tracking.trackEvent({
      action: "Video duration",
      label: "Display ad video duration",
      percent_complete: percentComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "panel",
    })
  })

  trackSeconds: Function = memoize(secondsComplete => {
    this.props.tracking.trackEvent({
      action: "Video seconds",
      label: "Display ad video seconds",
      seconds_complete: secondsComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "panel",
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
      "PlayButton__PlayButtonCaret",
    ]
    const withinMediaArea = valid.some(className =>
      event.target.className.includes(className)
    )
    return withinMediaArea
  }

  handleClick(event) {
    event.preventDefault()
    const { showCoverImage: alreadyClicked } = this.state
    const { campaign, isMobile, tracking, unit } = this.props
    const url = get(unit, "link.url", false)
    const isVideo = this.isVideo()

    const openUrl = () => {
      tracking.trackEvent({
        action: "Click",
        label: "Display ad clickthrough",
        entity_type: "display_ad",
        campaign_name: campaign.name,
        unit_layout: "panel",
      })

      if (url)
        window.open(
          replaceWithCacheBuster(url, getCurrentUnixTimestamp()) || "",
          "_blank"
        )
    }

    if (isMobile) {
      if (isVideo) {
        if (this.isWithinMediaArea(event)) {
          this.trackVideoClick()
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
   * Handle MouseEnter, on desktop
   */
  handleMouseEnter() {
    if (this.props.isMobile) {
      return false
    } else {
      if (this.isVideo()) {
        this.playVideo()

        this.props.tracking.trackEvent({
          action: "MouseEnter",
          label: "Display ad play video",
          entity_type: "display_ad",
          campaign_name: this.props.campaign.name,
          unit_layout: "panel",
        })
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
    if (this.props.unit.logo) {
      const showCoverImage = !this.state.showCoverImage
      this.setState({
        showCoverImage,
      })
    }
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
        isPlaying: false,
      })
    }
  }

  playVideo() {
    if (this.video) {
      this.video.play()

      this.setState({
        isPlaying: true,
      })
    }
  }

  /**
   * Handle clicks to Video player
   */
  trackVideoClick() {
    this.props.tracking.trackEvent({
      action: "Click",
      label: "Display ad play video",
      entity_type: "display_ad",
      campaign_name: this.props.campaign.name,
      unit_layout: "panel",
    })
  }

  isVideo() {
    const assetUrl = get(this.props.unit, "assets.0.url", "")
    const isVideo = assetUrl.includes("mp4")
    return isVideo
  }

  toggleMuted = e => {
    e.stopPropagation()
    this.setState({ isMuted: !this.state.isMuted })
  }

  renderVideoIcon() {
    const { isPlaying, isMuted } = this.state
    const { isMobile } = this.props

    if (isMobile) {
      return null
    } else if (isPlaying && isMuted) {
      return (
        <MutedIcon onClick={this.toggleMuted}>
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF">
              <path d="M29.514 28L19.13 17.614 9.557 8.043 1.514 0 0 1.514l6.529 6.529H.757V21.47H11.83l7.3 7.286v-8.114L28 29.514zM19.129.757l-7.3 7.286 7.3 7.3z" />
            </g>
          </svg>
        </MutedIcon>
      )
    } else if (isPlaying && !isMuted) {
      return (
        <UnmutedIcon onClick={this.toggleMuted}>
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF">
              <path d="M18 12.864V0l-7.152 7.286H0v13.428h10.848L18 28V12.864z" />
            </g>
          </svg>
        </UnmutedIcon>
      )
    } else {
      return <VideoPlayIcon />
    }
  }

  renderVideo(url) {
    const { isPlaying } = this.state
    const { isMobile } = this.props

    return (
      <VideoContainer className="VideoContainer">
        {!isPlaying && (
          <VideoCover className="VideoContainer__VideoCover">
            {isMobile && (
              <VideoControls mini className="VideoContainer__VideoControls" />
            )}
          </VideoCover>
        )}

        <video
          playsInline
          src={url}
          className="VideoContainer__video"
          controls={false}
          ref={video => (this.video = video)}
        />
        {this.renderVideoIcon()}
      </VideoContainer>
    )
  }

  render() {
    const { showCoverImage } = this.state
    const { unit, campaign, isMobile, renderTime } = this.props
    const url = get(unit.assets, "0.url", "")
    const isVideo = this.isVideo()
    const cover = unit.cover_image_url || ""
    const imageUrl = crop(url, { width: 680, height: 284, isDisplayAd: true })
    const hoverImageUrl = resize(unit.logo, { width: 680, isDisplayAd: true })
    const coverUrl = crop(cover, { width: 680, height: 284, isDisplayAd: true })

    return (
      <ErrorBoundary>
        <Wrapper
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Waypoint onEnter={this.trackImpression} />
          <DisplayPanelContainer
            className="DisplayPanel__DisplayPanelContainer"
            imageUrl={imageUrl}
            isMobile={isMobile}
            hoverImageUrl={hoverImageUrl}
            coverUrl={coverUrl}
            showCoverImage={showCoverImage}
          >
            {isVideo ? (
              this.renderVideo(url)
            ) : (
              <Image className="DisplayPanel__Image" />
            )}

            <div>
              <Headline>{unit.headline}</Headline>

              <Body
                dangerouslySetInnerHTML={{
                  __html: unit.body,
                }}
              />

              <SponsoredBy>{`Sponsored by ${campaign.name}`}</SponsoredBy>
            </div>
          </DisplayPanelContainer>
          <PixelTracker unit={unit} date={renderTime} />
        </Wrapper>
      </ErrorBoundary>
    )
  }
}

const Wrapper = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: black;
  max-width: 360px;

  ${breakpoint.sm`
    margin: 0 auto;
  `};
`

const Image = styled.div`
  margin-bottom: 15px;
  width: 100%;
  height: 142px;
  background-color: black;
  box-sizing: border-box;
`

const VideoCover = styled.div`
  margin-bottom: 15px;
  width: 100%;
  height: 142px;
  background-color: black;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DisplayPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  padding: 20px;
  max-width: 360px;
  box-sizing: border-box;

  ${Image} {
    background: url(${(p: DivUrlProps) => p.imageUrl || ""}) no-repeat center
      center;
    background-size: cover;

    ${(p: DivUrlProps) =>
      p.showCoverImage &&
      p.hoverImageUrl &&
      `
        background: black url(${p.hoverImageUrl}) no-repeat center center;
        background-size: contain;
        border: 10px solid black;
    `};
  }

  ${VideoCover} {
    background: url(${(p: DivUrlProps) => p.coverUrl || ""}) no-repeat center
      center;
    background-size: cover;

    ${(p: DivUrlProps) => p.showCoverImage && !p.isMobile && `display: none;`};
  }

  ${breakpoint.md`
    margin: auto;
  `};
  ${breakpoint.sm`
    margin: auto;
  `};
  ${breakpoint.xs`
    margin: auto;
  `};
`

const Headline = styled.div`
  ${unica("s16", "medium")};
  line-height: 1.23em;
  margin-bottom: 3px;
`

const Body = styled.div`
  ${garamond("s17")};
  line-height: 1.53em;
  margin-bottom: 20px;
  a {
    color: black;
  }
`

const SponsoredBy = styled.div`
  ${avantgarde("s11")};
  color: ${Colors.grayRegular};
`

const VideoContainer = styled(Image)`
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

const iconPositioning = side => `
  position: absolute;
  bottom: 13px;
  ${side}: 15px;
`

const VideoPlayIcon = styled.div`
  color: white;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 20px solid white;
  ${iconPositioning("left")};
`

const MutedIcon = styled.div`
  ${iconPositioning("right")};
`

const UnmutedIcon = styled.div`
  z-index: 3;
  ${iconPositioning("right")};
  right: 14px;
  bottom: 12px;
`

// Set names for tests and DOM
DisplayPanelContainer.displayName = "DisplayPanelContainer"
Image.displayName = "Image"
VideoContainer.displayName = "VideoContainer"
VideoCover.displayName = "VideoCover"
Wrapper.displayName = "Wrapper"
