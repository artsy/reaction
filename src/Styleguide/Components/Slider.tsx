import React, { ReactNode } from "react"
import Slick from "react-slick"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Styleguide/Utils/Responsive"

interface Props {
  height?: number
  data: Array<object> // This is designed to handle any shape of data passed, as long as its an array
  render: (slide) => ReactNode
}

export class Slider extends React.Component<Props> {
  static defaultProps = {
    height: 300,
  }

  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallSlider {...this.props} />
          else return <LargeSlider {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeSlider = (props: Props) => {
  const slickConfig = {
    arrows: false,
    draggable: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
  }

  let slickRef = null

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <ArrowButton left={-10} onClick={() => slickRef.slickPrev()}>
        <Arrow direction="left" color="black100" fontSize="11px" />
      </ArrowButton>

      <SliderContainer>
        <Slick {...slickConfig} ref={slider => (slickRef = slider)}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </SliderContainer>

      <ArrowButton right={-10} onClick={() => slickRef.slickNext()}>
        <Arrow direction="right" color="black100" fontSize="11px" />
      </ArrowButton>
    </Flex>
  )
}

export const SmallSlider = (props: Props) => {
  const slickConfig = {
    arrows: false,
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    swipeToSlide: true,
    touchThreshold: 60,
    variableWidth: true,
  }

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <SliderContainer>
        <Slick {...slickConfig}>
          {props.data.map((slide, index) => {
            return <Box key={index}>{props.render(slide)}</Box>
          })}
        </Slick>
      </SliderContainer>
    </Flex>
  )
}

const SliderContainer = styled.div`
  width: 100%;

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
  height: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 300px;
  user-select: none;
  opacity: 0.1;

  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }

  ${left};
  ${right};
`
