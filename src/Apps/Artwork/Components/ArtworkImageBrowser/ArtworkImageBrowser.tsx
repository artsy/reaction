import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { Lightbox } from "Components/v2"
import { BaseCarousel as Carousel } from "Components/v2/CarouselV3"
import React from "react"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

import { Box, ChevronIcon, Col, color, Flex, space } from "@artsy/palette"

interface ArtworkBrowserProps {
  imageAlt: string
  images: ArtworkImageBrowser_artwork["images"]
  flickityRef?: (flickityRef: Flickity) => void
}

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
  ArtworkBrowserProps
> {
  options = {
    prevNextButtons: false,
    wrapAround: true,
    pageDots: true,
    cellAlign: "left",
    draggable: false,
    lazyLoad: true,
  }

  render() {
    const hasMultipleImages = this.props.images.length > 1
    const { imageAlt, images } = this.props

    // FIXME: During SSR pass want to hide other images. Work around for lack
    // of SSR support in Flickity.
    const carouselImages = typeof window === "undefined" ? [images[0]] : images

    return (
      <Container>
        <Carousel
          showArrows={hasMultipleImages}
          options={this.options}
          oneSlideVisible
          height="60vh"
          data={carouselImages}
          renderLeftArrow={({ flickity }) => (
            <Col sm={1}>
              <ArrowButton
                direction="left"
                onClick={() => flickity.previous(false, true)}
              />
            </Col>
          )}
          renderRightArrow={({ flickity }) => (
            <Col sm={1}>
              <ArrowButton
                direction="right"
                onClick={() => flickity.next(false, true)}
              />
            </Col>
          )}
          render={image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                width="100%"
                px={hasMultipleImages ? [2, 2, 0] : 0}
                height="60vh"
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
          }}
        />
      </Container>
    )
  }
}

export class SmallArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps
> {
  options = {
    prevNextButtons: false,
    wrapAround: true,
    draggable: true,
    groupCells: 1,
    pageDots: true,
  }

  render() {
    const { images, imageAlt } = this.props
    // FIXME: During SSR pass want to hide other images. Work around for lack
    // of SSR support in Flickity.
    const carouselImages = typeof window === "undefined" ? [images[0]] : images
    return (
      <Container>
        <Carousel
          options={this.options}
          data={carouselImages}
          oneSlideVisible
          render={image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                px={1}
                width="100%"
                height="260px"
              >
                <Lightbox
                  imageAlt={imageAlt}
                  deepZoom={image.deepZoom}
                  enabled={image.is_zoomable}
                  isDefault={image.is_default}
                  src={image.uri}
                  initialHeight="45vh"
                />
              </Flex>
            )
          }}
        />
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
    width: 100%;
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
`

const PageIndicator = styled.span`
  &::after {
    content: "•";
  }
`

// @ts-ignore
PageIndicator.displayName = "PageIndicator"
