import { Box, ChevronIcon, color, Flex, space } from "@artsy/palette"
import React, { Fragment } from "react"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"

/**
 * Do NOT use `FlickityType` to create instances of Flickity. Only refer to it
 * for type purposes.
 *
 * @see BaseCarousel.prototype.componentDidMount()
 */
import FlickityType, { Options as FlickityOptions } from "flickity"

/**
 * Notes:
 * - We have the commercial license, which allows us to use this in our MIT licensed codebase,
 * but non-Artsy devs would technically be using the gplv3 version.
 * - For LazyLoad use Palette's Image lazyLoad prop instead of Flickities
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
  onArrowClick?: ({
    props: CarouselProps,
    state: BaseCarouselState,
    flickity: FlickityOptions,
  }) => void

  /**
   * The render callback returns an image to display
   */
  render: (slide, slideIndex: number) => React.ReactNode

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
  flickity: FlickityType
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
      {...props}
      options={{
        cellAlign: "left",
        contain: true,
        draggable: false,
        freeScroll: false,
        groupCells: true,
        pageDots: false,
        wrapAround: false,
        ...props.options,
      }}
    />
  )
}

export const SmallCarousel: React.FC<CarouselProps> = props => {
  // Only render pageDots and enable draggable if more than one slide
  const hasMultipleSlides = props.data.length > 1
  return (
    <BaseCarousel
      showArrows={false}
      {...props}
      options={{
        cellAlign: "left",
        draggable: hasMultipleSlides,
        freeScroll: true,
        contain: true,
        friction: 0.3,
        pageDots: hasMultipleSlides,
        prevNextButtons: false,
        wrapAround: false,
        ...props.options,
      }}
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
  flickity: FlickityType = null
  carouselRef = null

  /**
   * Options to pass to underlying flickity component
   */
  options: FlickityOptions = {
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

  allowPreventDefault = () => {
    // Fix for flickity bug introduced in iOS 13 https://github.com/metafizzy/flickity/issues/740
    let startX
    this.carouselRef.ontouchstart = e => {
      startX = e.touches[0].clientX
    }
    this.carouselRef.ontouchmove = e => {
      if (Math.abs(e.touches[0].clientX - startX) > 5 && e.cancelable) {
        e.preventDefault()
      }
    }
  }

  /**
   * Since Flickity doesn't support SSR rendering, we need to load it once the
   * client has mounted. During the server-side pass we use a Flex wrapper.
   *
   * In fact, the flickity library can't even be loaded in environments that do
   * not have a global `window` object. Thus we need to lazy load it here with
   * an inline `require` statement.
   */
  componentDidMount() {
    const { setCarouselRef } = this.props

    const Flickity = require("flickity") as typeof FlickityType
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
        this.allowPreventDefault()
      }
    )
  }

  componentWillUnmount() {
    if (this.flickity) {
      this.flickity.off("select", this.handleSlideChange)
      this.flickity.destroy()
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
        // FIXME: Undocumented API. Is there a way this can be achieved with
        // something public and commonly available?
        // @ts-ignore
        this.flickity.getLastCell().element
      )
      return lastItemVisible
    } else {
      return true
    }
  }

  renderLeftArrow = () => {
    const {
      arrowPosition,
      onArrowClick,
      renderLeftArrow,
      showArrows,
      height,
    } = this.props

    if (!showArrows) {
      return null
    }

    const leftPosition = arrowPosition != null ? arrowPosition : -space(4)

    const showLeftArrow =
      this.state.currentSlideIndex !== 0 || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper left={leftPosition} showArrow={showLeftArrow}>
        <ArrowButton
          height={height}
          onClick={() => {
            this.flickity.previous()

            if (onArrowClick) {
              onArrowClick({
                state: this.state,
                props: this.props,
                flickity: this.flickity,
              })
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
    const {
      arrowPosition,
      onArrowClick,
      renderRightArrow,
      showArrows,
      height,
    } = this.props

    if (!showArrows) {
      return null
    }

    const rightPosition = arrowPosition != null ? arrowPosition : -space(4)

    const showRightArrow =
      !this.checkLastItemVisible() || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper right={rightPosition} showArrow={showRightArrow}>
        <ArrowButton
          height={height}
          onClick={() => {
            this.flickity.next()

            if (onArrowClick) {
              onArrowClick({
                state: this.state,
                props: this.props,
                flickity: this.flickity,
              })
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
    // of SSR support in Flickity. This will only render the first 6 slides on SRR pass.
    const isServer = typeof window === "undefined"
    let carouselImages
    if (isServer && oneSlideVisible) {
      carouselImages = [data[0]]
    } else if (isServer && data.length > 5) {
      carouselImages = data.slice(0, 6)
    } else {
      carouselImages = data
    }

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
              {carouselImages.map((slide, slideIndex) => {
                return (
                  <Fragment key={slideIndex}>
                    {render(slide, slideIndex)}
                  </Fragment>
                )
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
