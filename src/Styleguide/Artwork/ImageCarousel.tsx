import React from "react"
import styled from "styled-components"

import { Flex } from "Styleguide/Elements/Flex"
import Icon from "Components/Icon"

/**
 * TODO: There’s a few uses of a `-debug-` CSS vendor prefix. Right now those
 *       are meant to manually be removed, but it might be nice to make it
 *       possible to automatically enable these (and things like adding labels
 *       to elements with their displayName) either as an extension to
 *       styled-components or as a wrapper.
 *
 *       We can take cues from https://github.com/kitze/styles-debugger for what
 *       is helpful in terms of debugging, but I find the way that that library
 *       to introduce too much API and thus not allowing all of CSS or re-using
 *       tooling like autocompletion, stylelint, etc.
 */

/**
 * The image should be placed 100px from the top of the document and leave 60px
 * for the buttons below the image.
 */
const ButtonsContainerHeight = 60
const ImageContainerViewportMargin = 100 + ButtonsContainerHeight

const Container = styled(Flex)`
  /* -debug-background-color: #0fdb82; */
`

const ImageAreaContainer = styled(Flex)`
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
  cursor: zoom-in;
  max-height: 100%;
  max-width: 100%;
`

// TODO: Should Icon have this styling by default?
const Button = styled.a`
  ${Icon /* sc-selector */} {
    vertical-align: middle;
  }
`

const NavigationButtonsContainer = styled(Flex)`
  width: 40px;
  /* -debug-background-color: blue; */
`

const ActionButtonsContainer = styled(Flex)`
  /* -debug-background-color: #f1af1b; */
`

interface ImageCarouselProps {
  src: string[]
}

interface ImageCarouselState {
  currentImage: number
}

export class ImageCarousel extends React.Component<
  ImageCarouselProps,
  ImageCarouselState
> {
  state = {
    currentImage: 0,
  }

  changeCurrentImage(by: number) {
    this.setState({
      currentImage: (this.state.currentImage + by) % this.props.src.length,
    })
  }

  renderImageContainer() {
    return (
      <ImageContainer
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={this.props.src[this.state.currentImage]}
          // tslint:disable-next-line:no-console
          onClick={() => console.log("Zoom")}
        />
      </ImageContainer>
    )
  }

  renderNavigationButton(
    iconName: "chevron-left" | "chevron-right",
    changeCurrentImageBy: number
  ) {
    return (
      <NavigationButtonsContainer
        flexDirection="column"
        justifyContent="center"
      >
        <Button
          href="#"
          onClick={e => {
            e.preventDefault()
            this.changeCurrentImage(changeCurrentImageBy)
          }}
        >
          <Icon name={iconName} color="black" />
        </Button>
      </NavigationButtonsContainer>
    )
  }

  renderImageArea() {
    const hasMultipleImages = this.props.src.length > 1
    return (
      <ImageAreaContainer flexDirection="row">
        {hasMultipleImages && this.renderNavigationButton("chevron-left", -1)}
        {this.renderImageContainer()}
        {hasMultipleImages && this.renderNavigationButton("chevron-right", +1)}
      </ImageAreaContainer>
    )
  }

  renderActionButtonsContainer() {
    return (
      <ActionButtonsContainer
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexBasis={`${ButtonsContainerHeight}px`}
      >
        <div>
          <Button href="#TODO">
            <Icon name="heart" color="black" />
          </Button>
          <Button href="#TODO">
            <Icon name="share" color="black" />
          </Button>
        </div>
      </ActionButtonsContainer>
    )
  }

  render() {
    return (
      <Container flexDirection="column">
        {this.renderImageArea()}
        {this.renderActionButtonsContainer()}
      </Container>
    )
  }
}
