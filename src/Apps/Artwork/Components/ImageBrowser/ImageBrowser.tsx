import { Box, color, Flex, ResponsiveImage } from "@artsy/palette"
import { ImageBrowser_artwork } from "__generated__/ImageBrowser_artwork.graphql"
import React from "react"
import Slider, { Settings } from "react-slick"
import styled from "styled-components"
import { Col, media, Row } from "Styleguide/Elements/Grid"
import { Media } from "Utils/Responsive"
import { ArrowButton } from "./ArrowButton"

interface ImageBrowserProps {
  images: ImageBrowser_artwork["images"]
}

export const ImageBrowser: React.SFC<ImageBrowserProps> = props => {
  return (
    <>
      <Media at="xs">
        <SmallImageCarousel images={props.images} />
      </Media>
      <Media greaterThan="xs">
        <LargeImageCarousel images={props.images} />
      </Media>
    </>
  )
}

export class SmallImageCarousel extends React.Component<ImageBrowserProps> {
  get settings(): Settings {
    return {
      arrows: false,
      customPaging: () => {
        return <PageIndicator />
      },
      dots: true,
      infinite: false,
      // TODO: Future optimization should it be needed
      // lazyLoad: "ondemand",
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }

  render() {
    return (
      <Container>
        <Slider {...this.settings}>
          {this.props.images.map(image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                px={1}
                key={image.id}
              >
                <ResponsiveImage src={image.uri} width="100%" />
              </Flex>
            )
          })}
        </Slider>
      </Container>
    )
  }
}

export class LargeImageCarousel extends React.Component<ImageBrowserProps> {
  slider: Slider

  get settings(): Settings {
    return {
      arrows: false,
      customPaging: () => {
        return <PageIndicator />
      },
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
            <Slider {...this.settings} ref={slider => (this.slider = slider)}>
              {this.props.images.map(image => {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    px={3}
                    key={image.id}
                  >
                    <DesktopImage src={image.uri} width="100%" />
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

const Container = styled(Box)`
  ${media.xs`
    .slick-dots {
      display: inline-block;
      text-align: right;
    }
  `};

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

const DesktopImage = styled(ResponsiveImage)`
  padding-bottom: 500px; /* Responsive max height */
`

const PageIndicator = styled.span`
  &::after {
    content: "•";
  }
`

DesktopImage.displayName = "DesktopImage"
ResponsiveImage.displayName = "ResponsiveImage"
PageIndicator.displayName = "PageIndicator"
