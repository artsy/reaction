import { Box, Flex, ResponsiveImage } from "@artsy/palette"
import { ImageBrowser_artwork } from "__generated__/ImageBrowser_artwork.graphql"
import React from "react"
import Slider, { Settings } from "react-slick"
import styled from "styled-components"
import { Arrow } from "Styleguide/Elements"
import { Col, Row } from "Styleguide/Elements/Grid"

interface SmallCarouselProps {
  images: ImageBrowser_artwork["images"]
}

export class SmallImageCarousel extends React.Component<SmallCarouselProps> {
  render() {
    const settings: Settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <Container>
        <Slider {...settings}>
          {this.props.images.map(image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                p={3}
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

export class LargeImageCarousel extends React.Component<SmallCarouselProps> {
  slider: Slider

  render() {
    const settings: Settings = {
      arrows: false,
      dots: true,
      infinite: false,
      lazyLoad: "ondemand",
      speed: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    const hasMultipleImages = this.props.images.length > 0

    return (
      <Container>
        <Box>
          <Row>
            <Col sm={1}>
              {hasMultipleImages && (
                <ArrowButton
                  direction="left"
                  onClick={() => this.slider.slickPrev()}
                />
              )}
            </Col>
            <Col sm={10}>
              <Slider {...settings} ref={slider => (this.slider = slider)}>
                {this.props.images.map(image => {
                  return (
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      p={3}
                      key={image.id}
                    >
                      <ResponsiveImage src={image.uri} width="100%" />
                    </Flex>
                  )
                })}
              </Slider>
            </Col>
            <Col sm={1}>
              {hasMultipleImages && (
                <ArrowButton
                  direction="right"
                  onClick={() => this.slider.slickNext()}
                />
              )}
            </Col>
          </Row>
        </Box>
      </Container>
    )
  }
}

const Container = styled.div`
  .slick-dots li {
    width: 2px;

    button {
      &::before {
        font-size: 5px;
      }
    }
  }
`

const ArrowButtonContainer = styled(Flex)`
  cursor: pointer;
  opacity: 0.1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`
const ArrowButton = ({ direction, onClick }) => {
  return (
    <ArrowButtonContainer
      flexDirection="column"
      justifyContent="center"
      height="100%"
      onClick={onClick}
    >
      <Arrow direction={direction} fontSize="24px" />
    </ArrowButtonContainer>
  )
}
