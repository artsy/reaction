import { compact, map } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"

interface DisplayCanvasTextProps extends React.HTMLProps<HTMLDivElement> {
  disclaimer?: any
  unit: any
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  layout?: any
  isSlideshowWithCaption?: boolean
}

const DisplayCanvasText: React.SFC<DisplayCanvasTextProps> = props => {
  const { disclaimer, unit } = props
  const isSlideshowWithCaption = unit.layout === "slideshow" && compact(map(unit.assets, "caption")).length
  const hasDisclaimer = unit.layout !== "overflow" && !isSlideshowWithCaption
  return (
    <CanvasInner layout={unit.layout} isSlideshowWithCaption>
      <Logo layout={unit.layout} src={unit.logo} />
      <div>
        <Headline layout={unit.layout} isSlideshowWithCaption>{unit.headline}</Headline>
        <Link layout={unit.layout} isSlideshowWithCaption>{unit.link.text}</Link>
      </div>
      {hasDisclaimer && disclaimer}
    </CanvasInner>
  )
}

const Div: StyledFunction<DivProps> = styled.div
const Img: StyledFunction<DivProps> = styled.img

const Logo = Img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: ${props => (props.layout === "overlay" ? "300px;" : "185px;")}
  max-height: ${props => (props.layout === "overlay" ? "100px;" : "65px;")}
  margin: ${props => (props.layout === "overlay" ? "60px auto;" : "20px 0;")}
  ${props => pMedia.sm`
    object-position: left;
    width: auto;
    ${props.layout === "overlay" &&
      `max-width: calc(100% - 60px);
        margin: 15px auto;`}
  `}
`
const CanvasInner = Div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.layout === "overlay" || props.isSlideshowWithCaption ? "space-around;" : "space-between;"}
  padding: 0 20px;
  ${props =>
    props.layout === "overlay" &&
    `text-align: center;
        color: #fff;
        max-width: 500px;`}
  ${props => pMedia.md`
    ${props.isSlideshowWithCaption && "padding: 0; width: 100%;"}
  `}
  ${pMedia.sm`
    max-width: 100%;
    width: 100%;
    padding: 0;
  `}
`
const Headline = Div`
  ${props => (props.layout === "overlay" ? Fonts.garamond("s23") : Fonts.garamond("s40"))}
  margin-bottom: 25px;
  line-height: ${props => (props.layout === "overlay" ? "1.35em;" : "1.1em;")} 
  ${props => pMedia.lg`
    ${props.isSlideshowWithCaption && Fonts.garamond("s23")}
  `}
  ${props => pMedia.sm`
    ${props.layout === "overlay" ? Fonts.garamond("s17") : Fonts.garamond("s23")}
    ${props.layout === "overlay" && "max-width: calc(100% - 40px);"}
    ${props.layout === "overlay" ? "margin: 0 auto 10px auto;" : "margin-bottom: 10px;"}
    line-height: 1.35em;
  `}
`
const Link = Div`
  ${Fonts.garamond("s23")}
  line-height: 1.35em;
  margin-bottom: 10px;
  display: initial;
  background-image: linear-gradient(to bottom, transparent 0, ${props =>
    props.layout === "overlay" ? "#FFF" : "#000"} 2px, transparent 0);
  background-position: bottom;
  background-size: 1px 5px;
  background-repeat: repeat-x;
  transition: all .3s;
  &:hover {
    opacity: .6;
  }
  ${props => pMedia.lg`
    ${props.isSlideshowWithCaption && Fonts.garamond("s17")}
  `}
  ${pMedia.sm`
    ${Fonts.garamond("s17")}
    line-height: 1.35em;
  `}
`
export default DisplayCanvasText
