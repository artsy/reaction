import { Box, ChevronIcon, Flex } from "@artsy/palette"
import { Options as FlickityOptions } from "flickity"
import React, { ReactNode, useRef, useState } from "react"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { useDidMount } from "Utils/hooks/useDidMount"
import { Media } from "Utils/Responsive"

type Arrow = (
  props: {
    Arrow: React.ReactType
    getFlickity: any
  } & Props
) => React.ReactNode

interface Props {
  height?: number
  data: object[] // This is designed to handle any shape of data passed, as long as its an array
  render: (slide) => ReactNode
  renderLeftArrow?: Arrow
  renderRightArrow?: Arrow
  onArrowClick?: () => void
  options?: FlickityOptions
}

const isClient = typeof window !== "undefined"

export class Carousel extends React.Component<Props> {
  static defaultProps = {
    height: 300,
  }

  render() {
    return (
      <>
        {isClient && (
          <Box key={Math.random()}>
            <Media at="xs">
              <SmallCarousel {...this.props} />
            </Media>
            <Media greaterThan="xs">
              <LargeCarousel {...this.props} />
            </Media>
          </Box>
        )}
        {!isClient && (
          <Box key={Math.random()}>
            <CarouselServer {...this.props} />
          </Box>
        )}
      </>
    )
  }
}

const renderSlides = props => {
  return props.data.map((slide, index) => {
    return <Box key={index}>{props.render(slide)}</Box>
  })
}

const CarouselServer = (props: Props) => {
  return (
    <Flex
      flexDirection="row"
      position="relative"
      justifyContent="space-around"
      alignItems="center"
      height={props.height}
    >
      <CarouselContainer height={props.height}>
        <Flex>{renderSlides(props)}</Flex>
      </CarouselContainer>
    </Flex>
  )
}

/*
 * Returns null if no window for SSR
 */
const Flickity = isClient ? require("react-flickity-component") : () => null

export const LargeCarousel = (props: Props) => {
  const [currentSlideIndex, setSlideIndex] = useState(0)
  const [lastItemVisible, setLastItemVisible] = useState(false)
  const flicktyRef = useRef(null)

  const isMounted = useDidMount()

  let flickity = null

  const checkLastItemVisible = () => {
    if (!flickity.slides.length) {
      return
    }
    const isLastItemVisible = flickity.selectedElements.includes(
      flickity.getLastCell().element
    )
    setLastItemVisible(isLastItemVisible)
  }

  if (isMounted) {
    if (flicktyRef.current !== null) {
      flickity = flicktyRef.current.flkty
    }

    flickity.on("select", index => {
      setSlideIndex(index)
      checkLastItemVisible()
    })
  }

  const options = {
    draggable: false,
    freeScroll: false,
    wrapAround: false,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    groupCells: true,
    contain: true,
    ...props.options,
  }

  const LeftArrow = () => {
    return (
      <ArrowButton
        onClick={() => {
          if (flickity) {
            flickity.previous()
          }
        }}
      >
        <ChevronIcon direction="left" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }

  const RightArrow = () => {
    return (
      <ArrowButton
        onClick={() => {
          if (flickity) {
            flickity.next()
          }
        }}
      >
        <ChevronIcon direction="right" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }

  const showLeftArrow = currentSlideIndex !== 0 || options.wrapAround === true
  const showRightArrow = !lastItemVisible || options.wrapAround === true

  return (
    <Flex
      flexDirection="row"
      position="relative"
      justifyContent="space-around"
      alignItems="center"
      height={props.height}
    >
      {showLeftArrow && (
        <ArrowWrapper left={-38}>
          {props.renderLeftArrow ? (
            props.renderLeftArrow({
              Arrow: LeftArrow,
              getFlickity: flickity,
              ...props,
            })
          ) : (
            <LeftArrow />
          )}
        </ArrowWrapper>
      )}

      <CarouselContainer height={props.height}>
        <Flickity options={options} ref={flicktyRef}>
          {renderSlides(props)}
        </Flickity>
      </CarouselContainer>

      {showRightArrow && (
        <ArrowWrapper right={-38}>
          {props.renderRightArrow ? (
            props.renderRightArrow({
              Arrow: RightArrow,
              getFlickity: flickity,
              ...props,
            })
          ) : (
            <RightArrow />
          )}
        </ArrowWrapper>
      )}
    </Flex>
  )
}

export const SmallCarousel = (props: Props) => {
  const options = {
    draggable: true,
    freeScroll: false,
    wrapAround: false,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    ...props.options,
  }

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <CarouselContainer height={props.height}>
        <Flickity options={options}>{renderSlides(props)}</Flickity>
      </CarouselContainer>
    </Flex>
  )
}

const ArrowWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  min-width: 30px;

  ${left};
  ${right};
`

const CarouselContainer = styled.div<{ height?: number }>`
  width: 100%;
  overflow: hidden;

  ${props => {
    if (props.height) {
      return `
        height: ${props.height}px;
      `
    }
  }};
`

export const ArrowButton = styled(Flex)<
  LeftProps & RightProps & { height?: number }
>`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  opacity: 0.3;

  transition: opacity 0.25s;
  min-height: ${p => p.height || 200}px;

  &:hover {
    opacity: 1;
  }
`
