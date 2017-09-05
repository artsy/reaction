import { map } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import Slider from "react-slick"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../helpers"
import Icon from "../../../icon"
import { zIndex } from "../../constants"
import Slide from "./slide"

interface FullscreenViewerProps extends React.HTMLProps<HTMLDivElement> {
  images: any
  show: boolean
  onClose: () => void
  slideIndex?: number
}

interface FullscreenViewerState {
  isCaptionOpen: boolean
}

class FullscreenViewer extends React.Component<FullscreenViewerProps, FullscreenViewerState> {
  static childContextTypes = {
    onToggleCaption: PropTypes.func,
  }

  private slider: any

  constructor(props) {
    super(props)
    this.state = { isCaptionOpen: false }
  }

  componentDidUpdate() {
    if (this.slider) {
      this.slider.innerSlider.list.setAttribute("tabindex", 0)
      this.slider.innerSlider.list.focus()
    }
  }

  handleKeydown = e => {
    if (e.keyCode === 27) {
      this.close(e)
    }
  }

  getChildContext() {
    return { onToggleCaption: this.toggleCaption }
  }

  toggleCaption = () => {
    this.setState({ isCaptionOpen: !this.state.isCaptionOpen })
  }

  close = e => {
    this.props.onClose()
  }

  renderImageComponents = () => {
    const images = this.props.images
    return map(images, (section, i) => {
      return (
        <Slide isCaptionOpen={this.state.isCaptionOpen} section={section} index={i + 1} total={images.length} key={i} />
      )
    })
  }

  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      lazyLoad: true,
      draggable: true,
      nextArrow: <RightArrow />,
      prevArrow: <LeftArrow />,
      initialSlide: this.props.slideIndex,
    }
    if (!this.props.show) {
      return null
    }
    return (
      <FullscreenViewerContainer onKeyDown={this.handleKeydown}>
        <Slider {...sliderSettings} ref={slider => (this.slider = slider)}>
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
  overflow: hidden;
  position: fixed;
  z-index: ${zIndex.modal};
  top: 0;
  left: 0;
  background-color: white;
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
  display: flex;
  align-items: center;
  position: absolute;
  height: 100vh;
  top: 0;
  box-sizing: border-box;
  ${props => (props.direction === "left" ? "left: 0px;" : "")}
  ${props => (props.direction === "right" ? "right: 0px;" : "")}
  ${Icon} {
    z-index: 10;
    cursor: pointer;
    padding: 60px;
  }
  ${pMedia.sm`
    display: none;
  `}
`
export default FullscreenViewer
