import { Box, ChevronIcon, Flex, media } from "@artsy/palette"
import React, { ReactNode } from "react"
import Slick, { Settings } from "react-slick"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"

interface Props {
  settings?: Settings
  height?: number
  data: object[] // This is designed to handle any shape of data passed, as long as its an array
  render: (slide) => ReactNode
}

export class Carousel extends React.Component<Props> {
  static defaultProps = {
    height: 300,
  }

  render() {
    return (
      <>
        <Media at="xs">
          <SmallCarousel {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeCarousel {...this.props} />
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
    slidesToScroll: 5,
    ...props.settings,
  }

  let slickRef = null

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      height={props.height}
    >
      <ArrowButton left={-8} onClick={() => slickRef.slickPrev()}>
        <ChevronIcon direction="left" fill="black100" size={50} />
      </ArrowButton>

      <CarouselContainer height={props.height}>
        <Slick {...slickConfig} ref={slider => (slickRef = slider)}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </CarouselContainer>

      <ArrowButton right={-8} onClick={() => slickRef.slickNext()}>
        <ChevronIcon direction="right" fill="black100" size={50} />
      </ArrowButton>
    </Flex>
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

export const ArrowButton = styled(Flex)<LeftProps & RightProps>`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  opacity: 0.1;

  transition: opacity 0.25s;
  min-height: ${p => p.height || 200}px;

  &:hover {
    opacity: 1;
  }

  ${left};
  ${right};
`
