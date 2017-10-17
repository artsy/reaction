import React from "react"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { pMedia } from "../../../Helpers"
import { sizeMeRefreshRate } from "../../Constants"
import { CanvasSlideshow } from "./CanvasSlideshow"
import { CanvasText } from "./CanvasText"
import { CanvasVideo } from "./CanvasVideo"

interface CanvasContainerProps {
  campaign: any
  disclaimer?: any
  size?: {
    width: number
  }
  unit?: any
}

function renderAsset(asset, campaign) {
  if (asset.url.includes("mp4")) {
    return (
      <CanvasVideo
        src={asset.url}
        campaign={campaign}
      />
    )
  } else {
    return (
      <Image
        src={crop(asset.url, {
          width: 1200,
          height: 760
        })}
      />
    )
  }
}

function handleVideoLinkClick(event) {
  // TODO: Ensure that full element can be clicked on video complete
  // Prevent links from blocking video playback.
  if (event.target.className.includes('CanvasVideo')) {
    event.target.preventDefault()
  }
}

const CanvasContainerComponent: React.SFC<CanvasContainerProps> = props => {
  const { campaign, disclaimer, size, unit } = props

  if (unit.layout === "overlay") {
    return (
      <CanvasLink href={unit.link.url} target="_blank" containerWidth={size.width} layout={unit.layout}>
        <Background backgroundUrl={unit.assets[0].url} />
        <CanvasText unit={unit} />
      </CanvasLink>
    )
  } else if (unit.layout === "slideshow") {
    return (
      <CanvasSlideshow unit={unit} campaign={campaign} disclaimer={disclaimer} containerWidth={size.width}>
        <CanvasLink href={unit.link.url} target="_blank" containerWidth={size.width} layout={unit.layout}>
          <CanvasText unit={unit} disclaimer={disclaimer} />
        </CanvasLink>
      </CanvasSlideshow>
    )
  } else {
    return (
      <CanvasLink onClick={handleVideoLinkClick} href={unit.link.url} target="_blank" containerWidth={size.width} layout={unit.layout}>
        {renderAsset(unit.assets[0], campaign)}
        <StandardContainer>
          <CanvasText unit={unit} disclaimer={disclaimer} />
        </StandardContainer>
      </CanvasLink>
    )
  }
}

CanvasContainerComponent.defaultProps = {
  size: {
    width: 1250,
  },
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
  `}
`
const CanvasLink = responsiveLink`
  width: 100%;
  height: 460px;
  color: #000;
  text-decoration: none;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: ${props => (props.layout === "standard" ? "space-between;" : "center;")}
  ${props => pMedia.lg`
    ${props.layout !== "overlay" && "max-height: " + maxAssetSize(props.containerWidth).height + "px;"}
    ${props.layout === "standard" &&
      `padding: 0 20px;
       width: calc(100% - 40px);`}
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
  ${pMedia.sm`
    max-width: 100%;
    width: 100%;
    height: auto;
  `}
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
    background-image: url(${props => props.backgroundUrl && props.backgroundUrl});
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
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

export const CanvasContainer = sizeMe(sizeMeOptions)(CanvasContainerComponent)
