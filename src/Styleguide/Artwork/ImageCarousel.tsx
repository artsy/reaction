import React from "react"
import styled from "styled-components"

import { Flex } from "Styleguide/Elements/Flex"
import Icon from "Components/Icon"

/**
 * The image should be placed 100px from the top of the document and leave 60px
 * for the buttons below the image.
 */
const ButtonsContainerHeight = 60
const ImageContainerViewportMargin = 100 + ButtonsContainerHeight

interface ImageCarouselProps {
  src: string
}

const Container = styled(Flex)`
  background-color: #0fdb82;
`

const ZoomHitTarget = styled.a`
  cursor: zoom-in;
  width: 100%;
  min-height: 450px;
  height: calc(100vh - ${ImageContainerViewportMargin}px);
  line-height: 0; /* Don’t introduce visual margins */
`

const ImageContainer = styled(Flex)`
  height: 100%;
  width: 100%;
`

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const ButtonsContainer = styled(Flex)`
  background-color: #f1af1b;
`

export class ImageCarousel extends React.Component<ImageCarouselProps> {
  render() {
    return (
      <Container flexDirection="column">
        <ZoomHitTarget>
          <ImageContainer
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={this.props.src} />
          </ImageContainer>
        </ZoomHitTarget>
        <ButtonsContainer
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexBasis={`${ButtonsContainerHeight}px`}
        >
          <div>
            <a href="#TODO">
              <Icon name="heart" color="black" />
            </a>
            <a href="#TODO">
              <Icon name="share" color="black" />
            </a>
          </div>
        </ButtonsContainer>
      </Container>
    )
  }
}
