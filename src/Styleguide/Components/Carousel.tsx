import { Box, Flex } from "@artsy/palette"
import React, { ReactNode } from "react"
import Slick, { Settings } from "react-slick"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Arrow } from "Styleguide/Elements/Arrow"
import { media } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

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
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallCarousel {...this.props} />
          else return <LargeCarousel {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeCarousel = (props: Props) => {
  const slickConfig = {
    arrows: false,
    draggable: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    ...props.settings,
  }

  let slickRef = null

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <ArrowButton left={-10} onClick={() => slickRef.slickPrev()}>
        <Arrow direction="left" color="black100" fontSize="11px" />
      </ArrowButton>

      <CarouselContainer>
        <Slick {...slickConfig} ref={slider => (slickRef = slider)}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </CarouselContainer>

      <ArrowButton right={-10} onClick={() => slickRef.slickNext()}>
        <Arrow direction="right" color="black100" fontSize="11px" />
      </ArrowButton>
    </Flex>
  )
}

export const SmallCarousel = (props: Props) => {
  const slickConfig = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    swipeToSlide: true,
    touchThreshold: 60,
    variableWidth: true,
    ...props.settings,
  }

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <CarouselContainer>
        <Slick {...slickConfig}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </CarouselContainer>
    </Flex>
  )
}

const CarouselContainer = styled.div`
  width: 100%;

  ${"" /*
    FIXME: The below two rules are hacks for SSR to render properly.
    Might have been fixed in https://github.com/artsy/reaction/pull/929
  */};

  .slick-track {
    display: inline-flex;
    width: 100% !important;
  }

  ${"" /*
    FIXME: On SSR mobile this shifts the image, must fix
    Might be fixed in https://github.com/artsy/reaction/pull/929
  */};

  ${media.xs`
    .slick-list {
      padding: 0 !important;
    }
  `};

  .slick-dots li {
    width: 0;

    button {
      &:before {
        font-size: 4px;
      }
    }
  }
`

const ArrowButton = styled(Flex).attrs<LeftProps & RightProps>({})`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  opacity: 0.1;

  transition: opacity 0.25s;
  min-height: 200px;

  &:hover {
    opacity: 1;
  }

  ${left};
  ${right};
`
