import React from "react"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../../utils/resizer"
import { pMedia } from "../../../helpers"
import Slideshow from "./slideshow"
import CanvasText from "./text"

interface DisplayCanvasContainerProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  disclaimer: any
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  backgroundUrl?: string
}

function isVideo(url) {
  return url.includes("mp4")
}

function renderAsset(asset) {
  if (isVideo(asset.url)) {
    return (
      <VideoContainer>
        <Video src={asset.url} autoPlay controls={false} loop muted playsInline />
      </VideoContainer>
    )
  } else {
    return <Image src={crop(asset.url, { width: 1200, height: 760 })} />
  }
}

const DisplayCanvasContainer: React.SFC<DisplayCanvasContainerProps> = props => {
  const { unit, disclaimer } = props

  if (unit.layout === "overlay") {
    return (
      <Canvas href={unit.link.url} target="_blank">
        <Background backgroundUrl={unit.assets[0].url} />
        <CanvasText unit={unit} />
      </Canvas>
    )
  } else if (unit.layout === "slideshow") {
    return (
      <Slideshow unit={unit} disclaimer={disclaimer}>
        <Canvas href={unit.link.url} target="_blank">
          <CanvasText unit={unit} disclaimer={disclaimer} />
        </Canvas>
      </Slideshow>
    )
  } else {
    return (
      <Canvas href={unit.link.url} target="_blank">
        {renderAsset(unit.assets[0])}
        <StandardContainer>
          <CanvasText unit={unit} disclaimer={disclaimer} />
        </StandardContainer>
      </Canvas>
    )
  }
}

const Div: StyledFunction<DivProps> = styled.div

const Image = styled.img`
  display: block;
  width: 65%;
  height: 100%;
  max-height: 460px;
  object-fit: cover;
  ${pMedia.sm`
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: initial;
    object-fit: contain;
  `}
`
const Canvas = styled.a`
  width: 100%;
  height: 460px;
  color: #000;
  text-decoration: none;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  position: relative;
  ${pMedia.sm`
    height: 400px;
    flex-direction: column;
    justify-content: flex-start;
  `}
`
const StandardContainer = styled.div`
  max-width: 35%;
  height: 100%;
  ${pMedia.sm`
    max-width: 100%;
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
const VideoContainer = styled.div`
  width: 65%;
  max-width: 760px;
  height: 460px;
  overflow: hidden;
  ${pMedia.sm`
    width: 100%;
    height: auto;
    overflow: visible;
  `}
`
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${pMedia.sm`
    height: auto;
  `}
`
export default DisplayCanvasContainer
