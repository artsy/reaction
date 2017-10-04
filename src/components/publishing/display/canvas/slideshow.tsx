import { compact, map } from "lodash"
import React from "react"
import Slider from "react-slick"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../assets/colors"
import { crop } from "../../../../utils/resizer"
import { pMedia } from "../../../helpers"
import Icon from "../../../icon"
import Fonts from "../../fonts"

interface SlideshowProps {
  unit: any
  disclaimer: any
  containerWidth: number
}

class DisplayCanvasSlideshow extends React.Component<SlideshowProps, any> {
  private slider: any

  constructor(props) {
    super(props)
    this.state = { isOnTitle: true }
  }

  renderTitleCard() {
    const { children, disclaimer, containerWidth, unit } = this.props
    const hasCaptions = compact(map(unit.assets, "caption")).length > 0
    return (
      <Title containerWidth={containerWidth}>
        {children}
        {hasCaptions && <Disclaimer>{disclaimer}</Disclaimer>}
      </Title>
    )
  }

  renderSlides = () => {
    const { unit, containerWidth } = this.props
    return unit.assets.map((image, i) => {
      return (
        <Slide key={i} className={i === 0 && "title-card"} containerWidth={containerWidth}>
          {i === 0 && containerWidth >= 900 && this.renderTitleCard()}
          <div>
            <Image
              src={crop(image.url, { width: 780, height: 460 })}
              alt={image.caption || ""}
              containerWidth={containerWidth}
            />
            {image.caption && <Caption>{image.caption}</Caption>}
          </div>
        </Slide>
      )
    })
  }

  onSlideChange = currentSlide => {
    this.setState({ isOnTitle: currentSlide === 0 })
  }

  render() {
    const { containerWidth } = this.props
    const sliderSettings = {
      dots: false,
      lazyLoad: false,
      infinite: false,
      variableWidth: true,
      centerMode: true,
      nextArrow: <RightArrow containerWidth={containerWidth} onRightArrow={() => this.slider.slickGoTo(0)} />,
      prevArrow: <LeftArrow containerWidth={containerWidth} isOnTitle={this.state.isOnTitle} />,
      initialSlide: 0,
      afterChange: currentSlide => {
        this.onSlideChange(currentSlide)
      },
      responsive: [
        {
          breakpoint: 900,
          settings: {
            infinite: true,
          },
        },
      ],
    }

    return (
      <SliderContainer containerWidth={containerWidth}>
        <Slider {...sliderSettings} ref={slider => (this.slider = slider)}>
          {this.renderSlides()}
        </Slider>
        {containerWidth < 900 && this.renderTitleCard()}
      </SliderContainer>
    )
  }
}

const LeftArrow = props => {
  return (
    <NavArrow
      containerWidth={props.containerWidth}
      direction="left"
      onClick={props.onClick}
      isVisible={!props.isOnTitle}
    >
      <Icon name="chevron-left" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const RightArrow = props => {
  const onClick = props.currentSlide + 1 === props.slideCount ? props.onRightArrow : props.onClick
  return (
    <NavArrow containerWidth={props.containerWidth} direction="right" onClick={onClick} isVisible>
      <Icon name="chevron-right" color="black" fontSize="24px" />
    </NavArrow>
  )
}

interface NavArrowProps extends React.HTMLProps<HTMLDivElement> {
  direction: string
  isVisible?: boolean
  containerWidth: number
}

interface ResponsiveProps extends React.HTMLProps<HTMLDivElement> {
  containerWidth: number
}

const arrowDiv: StyledFunction<NavArrowProps> = styled.div
const responsiveDiv: StyledFunction<ResponsiveProps> = styled.div
const responsiveImage: StyledFunction<ResponsiveProps> = styled.img

const NavArrow = arrowDiv`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  max-height: ${props => props.containerWidth * 0.65 * 0.59 + "px;"}
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
    max-height: ${props => "calc(" + props.containerWidth * 0.65 * 0.59 + "px + 2.5em);"}
    padding: 0 !important;
  }
`
const Slide = responsiveDiv`
  margin-right: 20px;
  &.title-card {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    ${props => pMedia.lg`
      max-width: ${props.containerWidth + "px;"}
    `}
    ${props => pMedia.md`
      max-width: ${props.containerWidth * 0.65 + "px;"}
  `}
  }
`
const Title = responsiveDiv`
  display: inline-block;
  width: 380px;
  padding: 0 20px;
  ${props => pMedia.lg`
    width: ${props.containerWidth * 0.35 + "px;"}
    a {
      max-height: ${props.containerWidth * 0.65 * 0.59 + "px;"}
    }
  `}
  ${pMedia.md`
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
  `}
`
const Image = responsiveImage`
  height: auto;
  max-width: 780px;
  max-height: 460px;
  object-fit: cover;
  object-position: center;
  ${props => pMedia.lg`
    max-height: ${props.containerWidth * 0.65 * 0.59 + "px;"}
  `}
`
const Caption = styled.div`
  ${Fonts.garamond("s11")}
  color: ${Colors.grayMedium};
  margin-top: 10px;
`

export default DisplayCanvasSlideshow
