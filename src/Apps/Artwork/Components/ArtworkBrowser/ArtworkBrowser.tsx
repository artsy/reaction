import { Box, color, Flex, ResponsiveImage } from "@artsy/palette"
import { ArtworkBrowser_artwork } from "__generated__/ArtworkBrowser_artwork.graphql"
import React from "react"
import Slider, { Settings } from "react-slick"
import styled from "styled-components"
import { Lightbox } from "Styleguide/Components"
import { Col, media, Row } from "Styleguide/Elements/Grid"
import { Media } from "Utils/Responsive"
import { ArrowButton } from "./ArrowButton"

interface ArtworkBrowserProps {
  images: ArtworkBrowser_artwork["images"]
}

export const ArtworkBrowser: React.SFC<ArtworkBrowserProps> = props => {
  return (
    <>
      <Media at="xs">
        <SmallArtworkBrowser images={props.images} />
      </Media>
      <Media greaterThan="xs">
        <LargeArtworkBrowser images={props.images} />
      </Media>
    </>
  )
}

export class LargeArtworkBrowser extends React.Component<ArtworkBrowserProps> {
  slider: Slider

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
                    <Lightbox
                      deepZoom={image.deepZoom}
                      enabled={image.is_zoomable}
                    >
                      <DesktopImage src={image.uri} width="100%" />
                    </Lightbox>
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

export class SmallArtworkBrowser extends React.Component<
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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }

  lock = () => {
    this.setState({
      isLocked: true,
    })
  }

  unlock = () => {
    setTimeout(() => {
      this.setState({
        isLocked: false,
      })
    }, 10)
  }

  render() {
    return (
      <Container
        onMouseMove={this.lock}
        onMouseUp={this.unlock}
        onTouchMove={this.lock}
        onTouchCancel={this.unlock}
      >
        <Slider {...this.settings}>
          {this.props.images.map(image => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                px={1}
                key={image.id}
              >
                <Lightbox
                  deepZoom={image.deepZoom}
                  enabled={!this.state.isLocked && image.is_zoomable}
                >
                  <ResponsiveImage src={image.uri} width="100%" />
                </Lightbox>
              </Flex>
            )
          })}
        </Slider>
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
  padding-bottom: 660px; /* Responsive max height */
`

const PageIndicator = styled.span`
  &::after {
    content: "•";
  }
`

DesktopImage.displayName = "DesktopImage"
ResponsiveImage.displayName = "ResponsiveImage"
PageIndicator.displayName = "PageIndicator"
