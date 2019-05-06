import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { Lightbox } from "Components/v2"
import React from "react"
import Slider, { Settings } from "react-slick"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

import { Box, ChevronIcon, Col, color, Flex, Row } from "@artsy/palette"

interface ArtworkBrowserProps {
  imageAlt: string
  images: ArtworkImageBrowser_artwork["images"]
  sliderRef?(slider: Slider): void
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
  slider: Slider

  setSliderRef = slider => {
    this.slider = slider
    if (this.props.sliderRef) {
      this.props.sliderRef(slider)
    }
  }

  get settings(): Settings {
    return {
      arrows: false,
      customPaging: () => <PageIndicator />,
      dots: true,
      infinite: false,
      lazyLoad: "ondemand",
      speed: 0,
      swipe: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
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
                onClick={() => this.slider.slickPrev()}
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
                onClick={() => this.slider.slickNext()}
              />
            </Col>
          )}
        </Row>
      </Container>
    )
  }
}

interface ArtworkBrowserState {
  isLocked: boolean
}

export class SmallArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps,
  ArtworkBrowserState
> {
  state = {
    isLocked: false,
  }

  get settings(): Settings {
    return {
      arrows: false,
      customPaging: () => <PageIndicator />,
      dots: true,
      infinite: false,
      // TODO: Future optimization should it be needed
      // lazyLoad: "ondemand",
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
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

  .slick-dots li {
    width: 2px;
    color: ${color("black10")};

    &.slick-active > span {
      color: ${color("black100")};
    }

    button {
      &::before {
        font-size: 5px;
      }
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
