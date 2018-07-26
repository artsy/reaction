import Colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import { compact, map } from "lodash"
import React from "react"
import Slider from "react-slick"
import track from "react-tracking"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { pMedia } from "../../../Helpers"
import Icon from "../../../Icon"
import { maxAssetSize } from "./CanvasContainer"

interface CanvasSlideshowProps {
  campaign: any
  containerWidth: number
  disclaimer: any
  unit: any
}

interface NavArrowProps extends React.HTMLProps<HTMLDivElement> {
  direction: string
  isVisible?: boolean
  containerWidth: number
}

interface ResponsiveProps extends React.HTMLProps<HTMLDivElement> {
  containerWidth: number
}

@track()
export class CanvasSlideshow extends React.Component<
  CanvasSlideshowProps,
  any
> {
  private slider: any

  constructor(props) {
    super(props)
    this.onChangeSlide = this.onChangeSlide.bind(this)

    this.state = {
      isOnTitle: true,
    }
  }

  afterSlideChange = currentSlide => {
    this.setState({
      isOnTitle: currentSlide === 0,
    })
  }

  @track(props => {
    return {
      action: "Click",
      label: "Display ad carousel arrow",
      entity_type: "display_ad",
      campaign_name: props.campaign.name,
      unit_layout: "canvas_slideshow",
    }
  })
  onChangeSlide(slide) {
    this.slider.slickGoTo(slide)
  }

  renderTitleCard() {
    const { children, disclaimer, containerWidth, unit } = this.props
    const renderDisclaimer = compact(map(unit.assets, "caption")).length > 0

    return (
      <Title containerWidth={containerWidth}>
        {children}

        {renderDisclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
      </Title>
    )
  }

  renderSlides = () => {
    const { unit, containerWidth } = this.props

    return unit.assets.map((image, i) => {
      const renderTitleCard = i === 0 && containerWidth >= 900
      const imageSrc = crop(image.url, {
        width: 780,
        height: 460,
        isDisplayAd: true,
      })
      const caption = image.caption || ""

      return (
        <Slide
          key={i}
          className={i === 0 && "title-card"}
          containerWidth={containerWidth}
        >
          {renderTitleCard && this.renderTitleCard()}

          <div>
            <Image
              src={imageSrc}
              alt={caption}
              containerWidth={containerWidth}
            />

            {caption && <Caption>{image.caption}</Caption>}
          </div>
        </Slide>
      )
    })
  }

  render() {
    const { containerWidth } = this.props

    const sliderSettings = {
      dots: false,
      lazyLoad: false,
      infinite: false,
      variableWidth: true,
      centerMode: true,
      nextArrow: (
        <RightArrow
          containerWidth={containerWidth}
          onChangeSlide={this.onChangeSlide}
        />
      ),
      prevArrow: (
        <LeftArrow
          containerWidth={containerWidth}
          onChangeSlide={this.onChangeSlide}
          isOnTitle={this.state.isOnTitle}
        />
      ),
      initialSlide: 0,
      afterChange: currentSlide => {
        this.afterSlideChange(currentSlide)
      },
      responsive: [
        {
          breakpoint: 900,
          settings: {
            infinite: true,
            controls: false,
          },
        },
      ],
    }

    const renderTitleCard = containerWidth < 900

    return (
      <div>
        <SliderContainer containerWidth={containerWidth}>
          <Slider {...sliderSettings} ref={slider => (this.slider = slider)}>
            {this.renderSlides()}
          </Slider>
        </SliderContainer>

        {renderTitleCard && this.renderTitleCard()}
      </div>
    )
  }
}

const LeftArrow = props => {
  const slide = props.currentSlide - 1 >= 0 ? 0 : props.currentSlide - 1

  return (
    <NavArrow
      containerWidth={props.containerWidth}
      direction="left"
      onClick={() => props.onChangeSlide(slide)}
      isVisible={!props.isOnTitle}
    >
      <Icon name="chevron-left" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const RightArrow = props => {
  const slide =
    props.currentSlide + 1 === props.slideCount ? 0 : props.currentSlide + 1

  return (
    <NavArrow
      containerWidth={props.containerWidth}
      direction="right"
      onClick={() => props.onChangeSlide(slide)}
      isVisible
    >
      <Icon name="chevron-right" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const arrowDiv: StyledFunction<NavArrowProps> = styled.div
const responsiveDiv: StyledFunction<ResponsiveProps> = styled.div
const responsiveImage: StyledFunction<ResponsiveProps> = styled.img

const NavArrow = arrowDiv`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  max-height: ${props => maxAssetSize(props.containerWidth).height + "px;"}
  top: 0;
  box-sizing: border-box;
  opacity: ${props => (props.isVisible ? "1;" : "0;")}
  transition: opacity .5s;
  ${props => props.direction === "left" && "left: 0px;"}
  ${props => props.direction === "right" && "right: 0px;"}
  ${Icon} {
    z-index: 10;
    cursor: pointer;
    padding: 10px;
    background: rgba(255, 255, 255, .8);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
  ${pMedia.md`
    display: none;
  `}
`
const SliderContainer = responsiveDiv`
  width: 100%;
  overflow: hidden;
  .slick-list {
    max-height: ${props =>
      "calc(" + maxAssetSize(props.containerWidth).height + "px + 2.5em);"}
    padding: 0 !important;
  }

  ${props => pMedia.md`
    max-height: ${maxAssetSize(props.containerWidth).height + "px;"}
  `}
`
const Slide = responsiveDiv`
  margin-right: 20px;
  &.title-card {
    max-width: 1190px;
    margin-left: 40px;
    width: ${props => props.containerWidth + "px;"}
    display: flex;
    justify-content: space-between;
    ${props => pMedia.md`
      max-width: ${maxAssetSize(props.containerWidth).width + "px;"}
    `}
  }
`
const Title = responsiveDiv`
  width: 380px;
  padding: 0 20px 0 0;
  ${props => pMedia.xl`
    padding: 0 40px;
    width: ${props.containerWidth * 0.35 + "px;"}
    a {
      max-height: ${maxAssetSize(props.containerWidth).height + "px;"}
    }
  `}
  ${pMedia.md`
    padding: 0 20px;
    width: 100%;
    a {
      height: initial;
      max-height: initial;
    }
  `}
`
const Disclaimer = styled.div`
  margin: -5px 0 0;
  ${pMedia.md`
    margin: 0;
    max-width: calc(100% - 40px);
  `};
`
const Image = responsiveImage`
  height: auto;
  max-width: ${props => maxAssetSize(props.containerWidth).width + "px;"}
  object-fit: cover;
  object-position: center;
  ${props => pMedia.lg`
    max-height: ${maxAssetSize(props.containerWidth).height + "px;"}
  `}
`
const Caption = styled.div`
  ${garamond("s11")} color: ${Colors.grayMedium};
  margin-top: 10px;
`
