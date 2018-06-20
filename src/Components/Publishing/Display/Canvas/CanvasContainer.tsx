import React from "react"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { track } from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { getCurrentUnixTimestamp } from "../../Constants"
import { SIZE_ME_REFRESH_RATE } from "../../Constants"
import { replaceWithCacheBuster } from "../ExternalTrackers"
import { CanvasSlideshow } from "./CanvasSlideshow"
import { CanvasText } from "./CanvasText"
import { CanvasVideo } from "./CanvasVideo"

interface CanvasContainerProps {
  campaign: any
  article?: any
  disclaimer?: any
  size?: {
    width: number
  }
  unit?: any
}

interface State {
  isMounted: boolean
}

@track()
export class CanvasContainerComponent extends React.Component<
  CanvasContainerProps,
  State
> {
  static defaultProps = {
    size: { width: 1250 },
  }

  public canvasVideoHandlers: any

  state = {
    isMounted: false,
  }

  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  // TODO: Ensure that full element can be clicked on video complete
  // Prevent links from blocking video playback.
  @track(
    (props, [e]) =>
      !isVideoClickArea(e) && {
        action: "Click",
        label: "Display ad clickthrough",
        entity_type: "display_ad",
        campaign_name: props.campaign.name,
        unit_layout: unitLayout(props),
      }
  )
  openLink(e) {
    e.preventDefault()

    if (!isVideoClickArea(e)) {
      if (this.canvasVideoHandlers) {
        this.canvasVideoHandlers.pauseVideo()
      }

      const url = replaceWithCacheBuster(
        e.currentTarget.attributes.href.value,
        getCurrentUnixTimestamp()
      )
      window.open(url, "_blank")
    }
  }

  render() {
    const { campaign, disclaimer, size, unit } = this.props
    const {
      assets,
      cover_image_url,
      layout,
      link: { url },
    } = unit
    const isOverlay = layout === "overlay"
    const isSlideshow = layout === "slideshow"

    // Props for Link units
    const linkProps = {
      onClick: this.openLink,
      href: url,
      target: "_blank",
      containerWidth: size.width,
      layout,
    }

    // TODO: For whatever the slideshow leads to a race condition when rendering
    // app in Force. Defer execution and everything works fine.
    if (!this.state.isMounted) {
      return <div />
    }

    // Overlay
    if (isOverlay) {
      const backgroundUrl = assets[0].url

      return (
        <CanvasLink {...linkProps}>
          <Background backgroundUrl={backgroundUrl} />
          <CanvasText unit={unit} />
        </CanvasLink>
      )

      // Slideshow
    } else if (isSlideshow) {
      const slideshowProps = {
        unit,
        campaign,
        disclaimer,
        containerWidth: size.width,
      }

      return (
        <CanvasSlideshow {...slideshowProps}>
          <CanvasLink {...linkProps}>
            <CanvasText unit={unit} disclaimer={disclaimer} />
          </CanvasLink>
        </CanvasSlideshow>
      )

      // Canvas -- Video / Image
    } else {
      const [asset] = unit.assets
      const isVideo = asset && asset.url.includes("mp4")

      return (
        <CanvasLink {...linkProps}>
          {isVideo ? (
            <CanvasVideo
              coverUrl={cover_image_url}
              src={asset.url}
              campaign={campaign}
              onInit={h => (this.canvasVideoHandlers = h)}
            />
          ) : (
            <Image
              src={crop(asset.url, {
                width: 1200,
                height: 760,
                isDisplayAd: true,
              })}
            />
          )}

          <StandardContainer>
            <CanvasText unit={unit} disclaimer={disclaimer} />
          </StandardContainer>
        </CanvasLink>
      )
    }
  }
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  backgroundUrl?: string
}

interface ResponsiveProps extends React.HTMLProps<HTMLLinkElement> {
  containerWidth: any
  href: any
  layout: string
  target: string
}

const Div: StyledFunction<DivProps> = styled.div
const responsiveLink: StyledFunction<ResponsiveProps> = styled.a

export const unitLayout = props => {
  switch (props.unit.layout) {
    case "overlay":
      return "canvas_overlay"
    case "slideshow":
      return "canvas_slideshow"
    default:
      return "canvas_standard"
  }
}

const isVideoClickArea = e => {
  const videoClasses = [
    "PlayButton",
    "PlayButton__PlayButtonCaret",
    "CanvasVideo__video",
  ]
  return videoClasses.some(c => e.target.className.includes(c))
}

export const maxAssetSize = containerWidth => {
  const width = containerWidth * 0.65
  const height = width * 0.59
  return { width, height }
}

const Image = styled.img`
  display: block;
  width: 65%;
  height: 100%;
  object-fit: cover;
  ${pMedia.sm`
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: initial;
    object-fit: contain;
  `};
`
export const CanvasLink = responsiveLink`
  width: 100%;
  height: 460px;
  color: #000;
  text-decoration: none;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: ${props =>
    props.layout === "standard" ? "space-between;" : "center;"}
  ${props => pMedia.lg`
    ${props.layout !== "overlay" &&
      "max-height: " + maxAssetSize(props.containerWidth).height + "px;"}
  `}
  ${pMedia.sm`
    padding: 0;
    width: 100%;
    height: 400px;
    flex-direction: column;
    justify-content: flex-start;
  `}
`
const StandardContainer = styled.div`
  max-width: calc(35% - 20px);
  height: 100%;
  margin-right: auto;
  ${pMedia.sm`
    max-width: 100%;
    width: 100%;
    height: auto;
  `};
`
const Background = Div`
  background: black;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  &:before {
    content: '';
    background-image: url(${props =>
      props.backgroundUrl && props.backgroundUrl});
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: 50%;
    z-index: 1;
    opacity: .7;
  }
`

const sizeMeOptions = {
  refreshRate: SIZE_ME_REFRESH_RATE,
  noPlaceholder: true,
}

export const CanvasContainer = sizeMe(sizeMeOptions)(CanvasContainerComponent)
