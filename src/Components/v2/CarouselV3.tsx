import { ChevronIcon, Flex, space } from "@artsy/palette"
import React, { Fragment } from "react"
import { FlickityOptions } from "react-flickity-component"
import styled from "styled-components"
import { left, LeftProps, right, RightProps } from "styled-system"
import { Media } from "Utils/Responsive"

interface CarouselProps {
  /**
   * This is designed to handle any shape of data passed, as long as its an array
   */
  data: any

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
  width?: number

  /**
   * Callback when forward / backward arrows are clicked
   */
  onArrowClick?: () => void

  /**
   * The render callback returns an image to display
   */
  render?: (slide, index) => React.ReactNode

  /**
   * Flickity options
   */
  options?: FlickityOptions

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
      <>
        <Media greaterThan="xs">
          <LargeCarousel {...this.props} />
        </Media>
        <Media at="xs">
          <SmallCarousel {...this.props} />
        </Media>
      </>
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
  return (
    <BaseCarousel
      showArrows={false}
      options={{
        cellAlign: "left",
        draggable: true,
        freeScroll: false,
        friction: 0.3,
        pageDots: true,
        prevNextButtons: false,
        wrapAround: false,
        ...props.options,
      }}
      {...props}
    />
  )
}

interface BaseCarouselState {
  FlickityCarousel: Flickity | typeof Flex
  currentSlideIndex: number
  lastItemVisible: boolean
  isMounted: boolean
}

export class BaseCarousel extends React.Component<
  CarouselProps,
  BaseCarouselState
> {
  state = {
    FlickityCarousel: Flex as any,
    currentSlideIndex: 0,
    lastItemVisible: false,
    isMounted: false,
  }

  /**
   * A reference to the Flickity instance
   */
  flickity = null

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
    const Flickity = require("react-flickity-component")

    this.setState(
      {
        FlickityCarousel: Flickity,
        isMounted: true,
      },
      () => {
        this.flickity.on("select", this.handleSlideChange)
      }
    )
  }

  componentWillUnmount() {
    this.flickity.off("select")
  }

  handleSlideChange = index => {
    this.setState({
      currentSlideIndex: index,
      lastItemVisible: this.checkLastItemVisible(),
    })
  }

  checkLastItemVisible = () => {
    const lastItemVisible = this.flickity.selectedElements.includes(
      this.flickity.getLastCell().element
    )
    return lastItemVisible
  }

  renderLeftArrow = () => {
    const { onArrowClick, renderLeftArrow, showArrows } = this.props

    if (!showArrows) {
      return null
    }

    const showLeftArrow =
      this.state.currentSlideIndex !== 0 || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper left={-space(4)} showArrow={showLeftArrow}>
        <ArrowButton
          onClick={() => {
            this.flickity.previous()

            if (onArrowClick) {
              onArrowClick()
            }
          }}
        >
          <ChevronIcon
            direction="left"
            fill="black100"
            width={30}
            height={30}
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
    const { onArrowClick, renderRightArrow, showArrows } = this.props

    if (!showArrows) {
      return null
    }

    const showRightArrow =
      !this.state.lastItemVisible || this.options.wrapAround === true

    const Arrow = () => (
      <ArrowWrapper right={-space(4)} showArrow={showRightArrow}>
        <ArrowButton
          onClick={() => {
            this.flickity.next()

            if (onArrowClick) {
              onArrowClick()
            }
          }}
        >
          <ChevronIcon
            direction="right"
            fill="black100"
            width={30}
            height={30}
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
    const { isMounted, FlickityCarousel } = this.state
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
              options={this.options}
              flickityRef={c => (this.flickity = c)}
            >
              {carouselImages.map((slide, index) => {
                return <Fragment key={index}>{render(slide, index)}</Fragment>
              })}
            </FlickityCarousel>
          </CarouselContainer>

          {this.renderRightArrow()}
        </Flex>
      </>
    )
  }
}

const CarouselContainer = styled.div<{
  height?: string
  isMounted: boolean
}>`
  width: 100%;
  position: relative;
  overflow: ${props => (props.isMounted ? "visible" : "hidden")};

  .flickity-viewport {
    overflow: hidden;
  }

  .flickity-slider {
    img {
      user-select: none;
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
  min-height: ${p => p.height || "200px"};

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
  transition: opacity 0.25s;
  opacity: ${props => (props.showArrow ? 1 : 0)};
  pointer-events: ${props => (props.showArrow ? "auto" : "none")};
  ${left};
  ${right};
`
