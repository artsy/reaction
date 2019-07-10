import { Box, ChevronIcon, color, Flex, space } from "@artsy/palette"
import { Options as FlickityOptions } from "flickity"
import React, { Fragment } from "react"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"

/**
 * Note: we have the commercial license, which allows us to use this in our MIT licensed codebase,
 * but non-Artsy devs would technically be using the gplv3 version.
 */

interface CarouselProps {
  /**
   * This is designed to handle any shape of data passed, as long as its an array
   */
  data: any

  /**
   * Passes CarouselRef
   */
  setCarouselRef?: (CarouselRef) => void

  /**
   * If this carousel contains only one visible image on render set to true (for SSR)
   */
  oneSlideVisible?: boolean

  /**
   * The height of the carousel
   */
  height?: string

  /**
   * The width of the carousel
   */
  width?: string

  /**
   * Callback when forward / backward arrows are clicked
   */
  onArrowClick?: () => void

  /**
   * The render callback returns an image to display
   */
  render: (slide) => React.ReactNode

  /**
   * Flickity options
   */
  options?: FlickityOptions

  /**
   * Pass an optional position for left and right for the arrow wrapper element otherwise defaults to -40
   */
  arrowPosition?: number

  /**
   * Show or hide arrows. Defaults to true
   */
  showArrows?: boolean

  /**
   * Custom renderer for the left arrow
   */
  renderLeftArrow?: ArrowProps

  /**
   * Custom renderer for the right arrow
   */
  renderRightArrow?: ArrowProps
}

type ArrowProps = (props: {
  currentSlideIndex: number
  Arrow: React.ReactType
  flickity: {
    previous: (isWrapped?: boolean, isInstant?: boolean) => void
    next: (isWrapped?: boolean, isInstant?: boolean) => void
  }
}) => React.ReactNode

export class Carousel extends React.Component<CarouselProps> {
  static defaultProps = {
    height: "300px",
    oneSlideVisible: false,
  }

  render() {
    return (
      <Box width="100%">
        <Media greaterThan="xs">
          <LargeCarousel {...this.props} />
        </Media>
        <Media at="xs">
          <SmallCarousel {...this.props} />
        </Media>
      </Box>
    )
  }
}

export const LargeCarousel: React.FC<CarouselProps> = props => {
  return (
    <BaseCarousel
      showArrows
      options={{
        cellAlign: "left",
        contain: true,
        draggable: false,
        freeScroll: false,
        groupCells: true,
        lazyLoad: false,
        pageDots: false,
        wrapAround: false,
        ...props.options,
      }}
      {...props}
    />
  )
}

export const SmallCarousel: React.FC<CarouselProps> = props => {
  // Only render pageDots and enable draggable if more than one slide
  const hasMultipleSlides = props.data.length > 1
  return (
    <BaseCarousel
      showArrows={false}
      options={{
        cellAlign: "left",
        draggable: hasMultipleSlides,
        freeScroll: false,
        contain: true,
        friction: 0.3,
        pageDots: hasMultipleSlides,
        prevNextButtons: false,
        wrapAround: false,
        ...props.options,
      }}
      {...props}
    />
  )
}

interface BaseCarouselState {
  currentSlideIndex: number
  lastItemVisible: boolean
  isMounted: boolean
}

export class BaseCarousel extends React.Component<
  CarouselProps,
  BaseCarouselState
> {
  state = {
    currentSlideIndex: 0,
    lastItemVisible: true,
    isMounted: false,
  }

  /**
   * A reference to the Flickity instance
   */
  flickity = null
  carouselRef = null

  /**
   * Options to pass to underlying flickity component
   */
  options: FlickityOptions = {
    lazyLoad: true,
    prevNextButtons: false,
  }

  constructor(props) {
    super(props)

    // Flickity carousel options can be overriden via `props.options`
    this.options = {
      ...this.options,
      ...props.options,
    }
  }

  /**
   * Since Flickity doesn't support SSR rendering, we need to load it once the
   * client has mounted. During the server-side pass we use a Flex wrapper instead.
   */
  componentDidMount() {
    const Flickity = require("flickity")
    const { setCarouselRef } = this.props

    this.flickity = new Flickity(this.carouselRef, this.options)

    this.setState(
      {
        isMounted: true,
      },
      () => {
        if (setCarouselRef) {
          setCarouselRef(this.flickity)
        }
        this.flickity.on("select", this.handleSlideChange)
      }
    )
  }

  componentWillUnmount() {
    if (this.flickity) {
      this.flickity.off("select")
    }
  }

  handleSlideChange = index => {
    this.setState({
      currentSlideIndex: index,
    })
  }

  checkLastItemVisible = () => {
    if (this.flickity && this.flickity.selectedElements) {
      const lastItemVisible = this.flickity.selectedElements.includes(
        this.flickity.getLastCell().element
      )
      return lastItemVisible
    } else {
      return true
    }
  }

  renderLeftArrow = () => {
    const { onArrowClick, renderLeftArrow, showArrows, height } = this.props

    if (!showArrows) {
      return null
    }

    const leftPosition =
      this.props.arrowPosition !== null &&
      this.props.arrowPosition !== undefined
        ? this.props.arrowPosition
        : -space(4)
    const showLeftArrow =
      this.state.currentSlideIndex !== 0 || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper left={leftPosition} showArrow={showLeftArrow}>
        <ArrowButton
          height={height}
          onClick={() => {
            this.flickity.previous()

            if (onArrowClick) {
              onArrowClick()
            }
          }}
        >
          <ChevronIcon
            height={30}
            direction="left"
            fill="black100"
            width={30}
          />
        </ArrowButton>
      </ArrowWrapper>
    )

    // Override default arrow display if custom render callback has been passed
    if (renderLeftArrow) {
      return renderLeftArrow({
        Arrow,
        currentSlideIndex: this.state.currentSlideIndex,
        flickity: this.flickity,
      })
    }

    return <Arrow />
  }

  renderRightArrow = () => {
    const { onArrowClick, renderRightArrow, showArrows, height } = this.props

    if (!showArrows) {
      return null
    }

    const rightPosition =
      this.props.arrowPosition !== null &&
      this.props.arrowPosition !== undefined
        ? this.props.arrowPosition
        : -space(4)

    const showRightArrow =
      !this.checkLastItemVisible() || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper right={rightPosition} showArrow={showRightArrow}>
        <ArrowButton
          height={height}
          onClick={() => {
            this.flickity.next()

            if (onArrowClick) {
              onArrowClick()
            }
          }}
        >
          <ChevronIcon
            height={30}
            direction="right"
            fill="black100"
            width={30}
          />
        </ArrowButton>
      </ArrowWrapper>
    )

    // Override default arrow display if custom render callback has been passed
    if (renderRightArrow) {
      return renderRightArrow({
        Arrow,
        currentSlideIndex: this.state.currentSlideIndex,
        flickity: this.flickity,
      })
    }

    return <Arrow />
  }

  render() {
    const { isMounted } = this.state
    const { data, height, oneSlideVisible, render } = this.props

    // FIXME: During SSR pass want to hide other images. Work around for lack
    // of SSR support in Flickity.
    const carouselImages =
      typeof window === "undefined" && oneSlideVisible ? [data[0]] : data

    return (
      <>
        <Flex
          flexDirection="row"
          position="relative"
          justifyContent="space-around"
          alignItems="center"
          height={height}
        >
          {this.renderLeftArrow()}

          <CarouselContainer height={height} isMounted={isMounted}>
            <FlickityCarousel
              isMounted={isMounted}
              ref={c => (this.carouselRef = c)}
            >
              {carouselImages.map((slide, index) => {
                return <Fragment key={index}>{render(slide)}</Fragment>
              })}
            </FlickityCarousel>
          </CarouselContainer>

          {this.renderRightArrow()}
        </Flex>
      </>
    )
  }
}

const FlickityCarousel = styled.div<{
  isMounted: boolean
}>`
  display: ${props => (props.isMounted ? "block" : "flex")};
`

const CarouselContainer = styled.div<{
  height?: string
  isMounted: boolean
}>`
  width: 100%;
  position: relative;
  overflow: ${props => (props.isMounted ? "visible" : "hidden")};

  .flickity-viewport {
    overflow: hidden;
    width: 100%;
  }

  .flickity-slider {
    img {
      user-select: none;
    }
  }

  .flickity-page-dots {
    text-align: center;
    height: 0;
    padding-top: ${space(1)}px;

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 100%;
      display: inline-block;
      margin: ${space(0.5)}px;
      background-color: ${color("black10")};
    }

    .dot.is-selected {
      background-color: ${color("black100")};
    }
  }

  ${props => {
    if (props.height) {
      return `
        height: ${props.height};
      `
    }
  }};
`

export const ArrowButton = styled(Flex)<
  LeftProps & RightProps & { height?: string }
>`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  opacity: 0.3;

  transition: opacity 0.25s;
  height: ${p => p.height || "200px"};

  &:hover {
    opacity: 1;
  }
`

const ArrowWrapper = styled.div<{
  left?: number
  right?: number
  showArrow: boolean
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  min-width: 30px;
  z-index: 10;
  transition: opacity 0.25s;
  opacity: ${props => (props.showArrow ? 1 : 0)};
  pointer-events: ${props => (props.showArrow ? "auto" : "none")};
  height: 100%;
  ${left};
  ${right};
`
