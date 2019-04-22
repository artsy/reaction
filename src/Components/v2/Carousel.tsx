import { Box, ChevronIcon, Flex, media } from "@artsy/palette"
import React, { ReactNode } from "react"
import Slick, { Settings } from "react-slick"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"

const SLIDES_TO_SCROLL = 5

type Arrow = (
  props: { Arrow: React.ReactType; getSlick: () => any } & Props
) => React.ReactNode

interface Props {
  settings?: Settings
  height?: number
  data: object[] // This is designed to handle any shape of data passed, as long as its an array
  render: (slide) => ReactNode
  renderLeftArrow?: Arrow
  renderRightArrow?: Arrow
  onArrowClick?: () => void
  lastSlideVisible?: boolean
  firstSlideVisible?: boolean
  afterChange?: (currentIndex: number) => void
}

interface State {
  lastSlideVisible: boolean
  firstSlideVisible: boolean
}

export class Carousel extends React.Component<Props, State> {
  static defaultProps = {
    height: 300,
  }
  state = {
    lastSlideVisible: false,
    firstSlideVisible: true,
  }

  afterChange = currentIndex => {
    this.setState({
      firstSlideVisible: !currentIndex,
      lastSlideVisible:
        currentIndex >= this.props.data.length - SLIDES_TO_SCROLL,
    })
  }

  render() {
    return (
      <>
        <Media at="xs">
          <SmallCarousel {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeCarousel
            lastSlideVisible={this.state.lastSlideVisible}
            firstSlideVisible={this.state.firstSlideVisible}
            afterChange={this.afterChange}
            {...this.props}
          />
        </Media>
      </>
    )
  }
}

export const LargeCarousel = (props: Props) => {
  const slickConfig = {
    arrows: false,
    draggable: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToScroll: SLIDES_TO_SCROLL,
    ...props.settings,
    afterChange: currentIndex => props.afterChange(currentIndex),
  }

  let slickRef = null

  const LeftArrow = () => {
    return (
      <ArrowButton
        left={-35}
        onClick={() => {
          slickRef.slickPrev && slickRef.slickPrev() // check existence for tests
          props.onArrowClick && props.onArrowClick()
        }}
      >
        <ChevronIcon direction="left" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }

  const RightArrow = () => {
    return (
      <ArrowButton
        right={-35}
        onClick={() => {
          slickRef.slickNext && slickRef.slickNext() // check existence for tests
          props.onArrowClick && props.onArrowClick()
        }}
      >
        <ChevronIcon direction="right" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }

  return (
    <Box position="relative">
      <Flex
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        height={props.height}
      >
        {props.renderLeftArrow
          ? props.renderLeftArrow({
              Arrow: LeftArrow,
              getSlick: () => slickRef,
              ...props,
            })
          : !props.firstSlideVisible && <LeftArrow />}

        <CarouselContainer height={props.height}>
          <Slick {...slickConfig} ref={slider => (slickRef = slider)}>
            {props.data.map((slide, index) => {
              return <Box key={index}>{props.render(slide)}</Box>
            })}
          </Slick>
        </CarouselContainer>

        {props.renderRightArrow
          ? props.renderRightArrow({
              Arrow: RightArrow,
              getSlick: () => slickRef,
              ...props,
            })
          : !props.lastSlideVisible && <RightArrow />}
      </Flex>
    </Box>
  )
}

export const SmallCarousel = (props: Props) => {
  const slickConfig = {
    arrows: false,
    dots: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 60,
    variableWidth: true,
    ...props.settings,
  }

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <CarouselContainer height={props.height}>
        <Slick {...slickConfig}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </CarouselContainer>
    </Flex>
  )
}

const CarouselContainer = styled.div<{ height?: number }>`
  width: 100%;

  ${"" /*
    FIXME: Revisit using react-slick -- too many hacks
*/};

  ${props => {
    if (props.height) {
      return `
        height: ${props.height}px;

        .slick-slider, .slick-list, .slick-slide {
          height: ${props.height}px;
        }
      `
    }
  }};

  ${"" /*
    FIXME: The below two rules are hacks for SSR to render properly.
    Might have been fixed in https://github.com/artsy/reaction/pull/929
  */};

  .slick-track {
    display: inline-flex;
    width: 100% !important;
  }

  .slick-slide {
    position: relative;
    top: -18px;
  }

  ${"" /*
    FIXME: On SSR mobile this shifts the image, must fix
    Might be fixed in https://github.com/artsy/reaction/pull/929
  */};

  ${media.xs`
    .slick-list {
      padding: 0 !important;
      height: ${p => p.height}px;
    }
  `};

  .slick-dots li {
    width: 0;

    button {
      &::before {
        font-size: 4px;
      }
    }
  }
`

export const ArrowButton = styled(Flex)<
  LeftProps & RightProps & { height?: number }
>`
  position: absolute;
  cursor: pointer;
  user-select: none;
  opacity: 0.1;
  align-items: center;
  transition: opacity 0.25s;
  min-height: ${p => p.height || 200}px;

  &:hover {
    opacity: 1;
  }

  ${left};
  ${right};
`
