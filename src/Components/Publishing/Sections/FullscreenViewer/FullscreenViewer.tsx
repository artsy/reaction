import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Clickable,
  CloseIcon,
  ModalBase,
} from "@artsy/palette"
import { map } from "lodash"
import PropTypes from "prop-types"
import React, { Component, HTMLProps } from "react"
// TODO: This is the only place this dependency is used. It'd be easy to remove!
import Slider, { Settings } from "react-slick"
import styled from "styled-components"
import { Slide } from "./Slide"

interface FullscreenViewerProps extends HTMLProps<HTMLDivElement> {
  images: any
  show: boolean
  onClose: () => void
  slideIndex?: number
}

interface FullscreenViewerState {
  isCaptionOpen: boolean
}

export class FullscreenViewer extends Component<
  FullscreenViewerProps,
  FullscreenViewerState
> {
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

  getChildContext() {
    return { onToggleCaption: this.toggleCaption }
  }

  toggleCaption = () => {
    this.setState({ isCaptionOpen: !this.state.isCaptionOpen })
  }

  renderImageComponents = () => {
    const images = this.props.images
    return map(images, (section, i) => {
      return (
        <Slide
          isCaptionOpen={this.state.isCaptionOpen}
          section={section}
          index={i + 1}
          total={images.length}
          key={i}
        />
      )
    })
  }

  render() {
    const sliderSettings: Settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      lazyLoad: "ondemand",
      draggable: true,
      nextArrow: <RightArrow />,
      prevArrow: <LeftArrow />,
      initialSlide: this.props.slideIndex,
    }

    return (
      <>
        {this.props.show && (
          <ModalBase
            onClose={this.props.onClose}
            dialogProps={{
              display: "block",
              width: "100%",
              height: "100%",
              bg: "white100",
            }}
          >
            <Slider {...sliderSettings} ref={slider => (this.slider = slider)}>
              {this.renderImageComponents()}
            </Slider>

            <Clickable
              onClick={this.props.onClose}
              position="absolute"
              top="0"
              right="0"
              p={2}
              style={{ cursor: "pointer" }}
            >
              <CloseIcon width="30" height="30" fill="black60" />
            </Clickable>
          </ModalBase>
        )}
      </>
    )
  }
}

const NavArrow = styled(Clickable).attrs({
  display: ["none", "flex"],
  px: 3,
  py: 6,
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`

const LeftArrow = props => {
  return (
    <NavArrow left="0" onClick={props.onClick}>
      <ArrowLeftIcon fill="black100" width="30" height="30" />
    </NavArrow>
  )
}

const RightArrow = props => {
  return (
    <NavArrow right="0" onClick={props.onClick}>
      <ArrowRightIcon fill="black100" width="30" height="30" />
    </NavArrow>
  )
}
