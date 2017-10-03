import { compact, map } from "lodash"
import React from "react"
import Slider from "react-slick"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../assets/colors"
import { crop } from "../../../../utils/resizer"
import { pMedia } from "../../../helpers"
import Icon from "../../../icon"
import Fonts from "../../fonts"

interface SlideshowProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  disclaimer: any
}

class DisplayCanvasSlideshow extends React.Component<SlideshowProps, any> {
  private slider: any

  constructor(props) {
    super(props)
    this.state = { isOnTitle: true }
  }

  renderSlides = () => {
    const { children, disclaimer, unit } = this.props
    const hasCaptions = compact(map(unit.assets, "caption")).length > 0

    return unit.assets.map((image, i) => {
      return (
        <Slide key={i} className={i === 0 && "title-card"}>
          {i === 0 &&
            <Title>
              {children}
              {hasCaptions && <Disclaimer>{disclaimer}</Disclaimer>}
            </Title>}
          <div>
            <Image src={crop(image.url, { width: 780, height: 460 })} alt={image.caption || ""} />
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
    const sliderSettings = {
      dots: false,
      lazyLoad: false,
      infinite: false,
      variableWidth: true,
      centerMode: true,
      nextArrow: <RightArrow onRightArrow={() => this.slider.slickGoTo(0)} />,
      prevArrow: <LeftArrow isOnTitle={this.state.isOnTitle} />,
      initialSlide: 0,
      afterChange: currentSlide => {
        this.onSlideChange(currentSlide)
      },
    }

    return (
      <SliderContainer>
        <Slider {...sliderSettings} ref={slider => (this.slider = slider)}>
          {this.renderSlides()}
        </Slider>
      </SliderContainer>
    )
  }
}

const LeftArrow = props => {
  return (
    <NavArrow direction="left" onClick={props.onClick} isVisible={!props.isOnTitle}>
      <Icon name="chevron-left" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const RightArrow = props => {
  const onClick = props.currentSlide + 1 === props.slideCount ? props.onRightArrow : props.onClick
  return (
    <NavArrow direction="right" onClick={onClick} isVisible>
      <Icon name="chevron-right" color="black" fontSize="24px" />
    </NavArrow>
  )
}

interface NavArrowProps extends React.HTMLProps<HTMLDivElement> {
  direction: string
  isVisible?: boolean
}

const div: StyledFunction<NavArrowProps> = styled.div

const NavArrow = div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
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
  ${pMedia.sm`
    display: none;
  `}
`

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  .slick-slider {
    height: 100%;
  }
`

const Slide = styled.div`
  max-width: 780px;
  margin-right: 20px;
  &.title-card {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    max-width: 100%;
  }
  ${pMedia.xs`
    max-width: 400px;
    height: auto;
  `}
`
const Title = styled.div`
  display: inline-block;
  a {
    max-width: 420px;
    width: 420px;
    min-width: 100%;
  }
`
const Disclaimer = styled.div`
  margin: -5px 20px 0;
`
const Image = styled.img`
  height: auto;
  max-width: 760px;
  max-height: 460px;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const Caption = styled.div`
  ${Fonts.garamond("s11")}
  color: ${Colors.grayMedium};
  margin-top: 10px;
`

export default DisplayCanvasSlideshow
