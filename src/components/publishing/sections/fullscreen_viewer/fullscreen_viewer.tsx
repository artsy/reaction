import { compact, filter, flatten, map } from "lodash"
import * as React from "react"
import Slider from "react-slick"
import styled, { StyledFunction } from "styled-components"
import Icon from "../../../icon"
import Slide from "./slide"

interface FullscreenViewerProps extends React.HTMLProps<HTMLDivElement> {
  sections: any
}

interface FullscreenViewerState {
  open: boolean
  activeIndex: number
}

class FullscreenViewer extends React.Component<FullscreenViewerProps, FullscreenViewerState> {
  constructor(props) {
    super(props)
  }

  close = () => {
    console.log("closing")
  }

  next = () => {
    const newActiveIndex = this.state.activeIndex === this.props.sections.length - 1 ? this.state.activeIndex + 1 : 0
    this.setState({ activeIndex: newActiveIndex })
  }

  prev = () => {
    const newActiveIndex = this.state.activeIndex === 0 ? this.props.sections.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: newActiveIndex })
  }

  getImages = () => {
    const imageSections = filter(this.props.sections, section => section.type === "image_collection")
    return compact(flatten(map(imageSections, "images")))
  }

  renderImageComponents = () => {
    return map(this.getImages(), (section, i) => {
      return (
        <div>
          <Slide section={section} key={i} />
        </div>
      )
    })
  }

  render() {
    const sliderSettings = {
      centerMode: true,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      accessibility: true,
      lazyLoad: true,
      draggable: true,
      nextArrow: <RightArrow />,
      prevArrow: <LeftArrow />,
    }
    return (
      <FullscreenViewerContainer>
        <Slider {...sliderSettings}>
          {this.renderImageComponents()}
        </Slider>
        <Close onClick={this.close}>
          <Icon name="close" color="gray" fontSize="24px" />
        </Close>
      </FullscreenViewerContainer>
    )
  }
}

const LeftArrow = props => {
  return (
    <NavArrow direction="left" onClick={props.onClick}>
      <Icon name="chevron-left" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const RightArrow = props => {
  return (
    <NavArrow direction="right" onClick={props.onClick}>
      <Icon name="chevron-right" color="black" fontSize="24px" />
    </NavArrow>
  )
}

const FullscreenViewerContainer = styled.div`
  width: 100vw;
  height: 100vh;
`
const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;
  cursor: pointer;
`
interface NavArrowProps extends React.HTMLProps<HTMLDivElement> {
  direction: string
}
const div: StyledFunction<NavArrowProps> = styled.div
const NavArrow = div`
  position: absolute;
  height: 100vh;
  top: 50%;
  ${props => (props.direction === "left" ? "left: 0px;" : "")}
  ${props => (props.direction === "right" ? "right: 0px;" : "")}
`
export default FullscreenViewer
