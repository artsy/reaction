import { Box, ChevronIcon, Flex } from "@artsy/palette"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"
import { FlickitySettings } from "./types"

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
  flickitySettings?: FlickitySettings
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

/*
 * Returns null if no window for SSR
 */
const Flickity =
  typeof window !== "undefined"
    ? require("react-flickity-component")
    : () => null

export const LargeCarousel = (props: Props) => {
  const [isMounted, toggleMounted] = useState(false)
  const [currentSlideIndex, setSlideIndex] = useState(0)
  const [lastItemVisible, setLastItemVisible] = useState(false)

  useEffect(() => {
    toggleMounted(true)
  }, [])
  const flcktyRef = useRef(null)

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
    if (flcktyRef.current !== null) {
      flickity = flcktyRef.current.flkty
    }

    flickity.on("select", index => {
      setSlideIndex(index)
      checkLastItemVisible()
    })
  }

  const flickityOptions = {
    draggable: false,
    freeScroll: false,
    wrapAround: false,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    groupCells: true,
    contain: true,
    ...props.flickitySettings,
  }

  const LeftArrow = () => {
    const getFlickity = flickity
    return (
      <ArrowButton
        left={-38}
        onClick={() => {
          getFlickity.previous && getFlickity.previous() // check existence for tests
        }}
      >
        <ChevronIcon direction="left" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }

  const RightArrow = () => {
    const getFlickity = flickity
    return (
      <ArrowButton
        right={-38}
        onClick={() => {
          getFlickity.next && getFlickity.next() // check existence for tests
        }}
      >
        <ChevronIcon direction="right" fill="black100" width={30} height={30} />
      </ArrowButton>
    )
  }
  return (
    <Flex
      flexDirection="row"
      position="relative"
      justifyContent="space-around"
      alignItems="center"
      height={props.height}
    >
      {currentSlideIndex !== 0 && (
        <Box>
          {props.renderLeftArrow ? (
            props.renderLeftArrow({
              Arrow: LeftArrow,
              getFlickity: flickity,
              ...props,
            })
          ) : (
            <LeftArrow />
          )}
        </Box>
      )}

      <CarouselContainer height={props.height}>
        {Flickity && (
          <Flickity options={flickityOptions} ref={flcktyRef}>
            {props.data.map((slide, index) => {
              return <Box key={index}>{props.render(slide)}</Box>
            })}
          </Flickity>
        )}
      </CarouselContainer>

      {!lastItemVisible && (
        <Box>
          {props.renderRightArrow ? (
            props.renderRightArrow({
              Arrow: RightArrow,
              getFlickity: flickity,
              ...props,
            })
          ) : (
            <RightArrow />
          )}
        </Box>
      )}
    </Flex>
  )
}

export const SmallCarousel = (props: Props) => {
  const flickityOptions = {
    draggable: true,
    freeScroll: false,
    wrapAround: false,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    ...props.flickitySettings,
  }

  return (
    <Flex justifyContent="space-around" alignItems="center">
      <CarouselContainer height={props.height}>
        {Flickity && (
          <Flickity options={flickityOptions}>
            {props.data.map((slide, index) => {
              return <Box key={index}>{props.render(slide)}</Box>
            })}
          </Flickity>
        )}
      </CarouselContainer>
    </Flex>
  )
}

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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

  ${left};
  ${right};
`
