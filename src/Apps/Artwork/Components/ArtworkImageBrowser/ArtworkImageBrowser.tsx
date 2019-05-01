import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { Lightbox } from "Components/v2"
import { Options as FlickityOptions } from "flickity"
import React from "react"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

import { Box, ChevronIcon, Col, color, Flex, Row } from "@artsy/palette"

interface ArtworkBrowserProps {
  imageAlt: string
  images: ArtworkImageBrowser_artwork["images"]
  flickityRef?: (flickityRef: Flickity) => void
}

interface ArtworkBrowserState {
  isLocked?: boolean
  mounted: boolean
}

/*
 * Returns null if no window for SSR
 */
const isClient = typeof window !== "undefined"
const Flickity = isClient ? require("react-flickity-component") : () => null

export const ArtworkImageBrowser = (props: ArtworkBrowserProps) => {
  return (
    <>
      <Media at="xs">
        <SmallArtworkImageBrowser {...props} />
      </Media>
      <Media greaterThan="xs">
        <LargeArtworkImageBrowser {...props} />
      </Media>
    </>
  )
}

export class LargeArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps,
  ArtworkBrowserState
> {
  state = { mounted: false }

  flickity = null

  options = {
    prevNextButtons: false,
    wrapAround: true,
    pageDots: true,
    cellAlign: "left",
    draggable: false,
    lazyLoad: true,
  } as FlickityOptions

  componentDidMount() {
    this.setState({
      mounted: true,
    })
    const { flickityRef } = this.props
    if (this.flickity && flickityRef) {
      flickityRef(this.flickity)
    }
  }

  renderSlide = (image, hasMultipleImages) => {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        width="100%"
        px={hasMultipleImages ? [2, 2, 0] : 0}
        key={isClient + image.id}
      >
        <Lightbox
          deepZoom={image.deepZoom}
          enabled={image.is_zoomable}
          isDefault={image.is_default}
        >
          <DesktopImage src={image.uri} width="100%" />
        </Lightbox>
      </Flex>
    )
  }

  renderCarousel = hasMultipleImages => {
    return (
      <Flickity options={this.options} flickityRef={c => (this.flickity = c)}>
        {this.props.images.map(image => {
          return this.renderSlide(image, hasMultipleImages)
        })}
      </Flickity>
    )
  }

  renderServerCarousel = hasMultipleImages => {
    return (
      <Flex>
        {this.props.images.map((image, index) => {
          const isFirstImage =
            index === 0 ? this.renderSlide(image, hasMultipleImages) : null
          return isFirstImage
        })}
      </Flex>
    )
  }

  render() {
    const hasMultipleImages = this.props.images.length > 1
    const { imageAlt, images } = this.props
    return (
      <Container>
        <Row>
          {hasMultipleImages && (
            <Col sm={1}>
              <ArrowButton
                direction="left"
                onClick={() => this.flickity.previous(false, true)}
              />
            </Col>
          )}
          <Col sm={hasMultipleImages ? 10 : 12}>
            <Slider {...this.settings} ref={this.setSliderRef}>
              {images.map(image => {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    px={hasMultipleImages ? [2, 2, 0] : 0}
                    key={image.id}
                  >
                    <Lightbox
                      imageAlt={imageAlt}
                      deepZoom={image.deepZoom}
                      enabled={image.is_zoomable}
                      isDefault={image.is_default}
                      src={image.uri}
                      initialHeight="60vh"
                    />
                  </Flex>
                )
              })}
            </Slider>
          </Col>
          {hasMultipleImages && (
            <Col sm={1}>
              <ArrowButton
                direction="right"
                onClick={() => this.flickity.next(false, true)}
              />
            </Col>
          )}
        </Row>
      </Container>
    )
  }
}

export class SmallArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps,
  ArtworkBrowserState
> {
  state = {
    isLocked: false,
    mounted: false,
  }

  flickity = null

  options: FlickityOptions = {
    prevNextButtons: false,
    wrapAround: true,
    draggable: true,
    groupCells: 1,
    pageDots: true,
  }

  componentWillMount() {
    this.setState({
      mounted: true,
    })
  }

  renderCarousel = () => {
    return (
      <Flickity
        options={this.options}
        key="client"
        flickityRef={c => (this.flickity = c)}
      >
        {this.props.images.map(image => {
          return this.renderSlide(image)
        })}
      </Flickity>
    )
  }

  renderServerCarousel = () => {
    return (
      <Box key="server">
        {this.props.images.map((image, index) => {
          const isFirstImage = index === 0 ? this.renderSlide(image) : null
          return isFirstImage
        })}
      </Box>
    )
  }

  renderSlide = image => {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        px={1}
        key={image.id}
        width="100%"
      >
        <Lightbox
          deepZoom={image.deepZoom}
          enabled={!this.state.isLocked && image.is_zoomable}
          isDefault={image.is_default}
        >
          <ResponsiveImage src={image.uri} width="100%" />
        </Lightbox>
      </Flex>
    )
  }

  render() {
    const { sliderRef, imageAlt, images } = this.props
    return (
      <Container>
        <Slider {...this.settings} ref={sliderRef}>
          {images.map(image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                px={1}
                key={image.id}
              >
                <Lightbox
                  imageAlt={imageAlt}
                  deepZoom={image.deepZoom}
                  enabled={!this.state.isLocked && image.is_zoomable}
                  isDefault={image.is_default}
                  src={image.uri}
                  initialHeight="45vh"
                />
              </Flex>
            )
          })}
        </Slider>
      </Container>
    )
  }
}

const ArrowButton = ({ direction, onClick }) => {
  return (
    <ArrowButtonContainer
      flexDirection="column"
      justifyContent="center"
      height="100%"
      alignItems={direction === "left" ? "flex-start" : "flex-end"}
      onClick={onClick}
    >
      <ChevronIcon direction={direction} width={30} height={30} />
    </ArrowButtonContainer>
  )
}

const ArrowButtonContainer = styled(Flex)`
  cursor: pointer;
  opacity: 0.1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`

const Container = styled(Box)`
  user-select: none;

  .flickity-viewport {
    overflow: hidden;
  }

  .flickity-slider > div {
    margin-left: 5px;
    margin-right: 5px;
  }

  .flickity-page-dots {
    text-align: center;
    height: 0;
    padding-top: ${space(1)}px;
  }

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
`

const PageIndicator = styled.span`
  &::after {
    content: "•";
  }
`

// @ts-ignore
PageIndicator.displayName = "PageIndicator"
