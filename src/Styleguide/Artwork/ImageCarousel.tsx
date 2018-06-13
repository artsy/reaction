import React from "react"
import styled from "styled-components"

import { Flex } from "Styleguide/Elements/Flex"
import Icon from "Components/Icon"
import { Responsive } from "../Utils/Responsive"

/**
 * The image should be placed 100px from the top of the document and leave 60px
 * for the buttons below the image.
 */
const ButtonsContainerHeight = 60
const ButtonsContainerWithPageIndicatorsHeight = ButtonsContainerHeight + 20
const ImageContainerViewportMargin = 100 + ButtonsContainerHeight

const Container = styled(Flex)`
  /* background-color: #0fdb82; */
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

  /* background-color: blue; */
`
const PageIndicator = styled.span`
  &::after {
    content: "•";
  }

  color: ${({ isHighlighted }: { isHighlighted: boolean }) =>
    isHighlighted ? "#000" : "#d8d8d8"};
`

const ControlsContainer = styled(Flex)`
  /* background-color: #f1af1b; */
`

/**
 * Give items margin on both sides so they don’t hug the side on small screens
 * when the controls are shown next to each other, but also are still centered
 * on larger screens when they are shown above each other.
 */
const ControlsContainerItem = styled(Flex)`
  margin-left: 20px;
  margin-right: 20px;
`

const ActionButtonsContainer = styled(ControlsContainerItem)``

const PageIndicatorsContainer = styled(ControlsContainerItem)`
  ${PageIndicator} + ${PageIndicator} {
    margin-left: 5px;
  }

  /* background-color: red; */
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
      <Responsive>
        {({ xs }) => {
          if (xs) {
            return null
          } else {
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
        }}
      </Responsive>
    )
  }

  hasMultipleImages() {
    return this.props.src.length > 1
  }

  renderImageArea() {
    return (
      <ImageAreaContainer flexDirection="row">
        {this.hasMultipleImages() &&
          this.renderNavigationButton("chevron-left", -1)}
        {this.renderImageContainer()}
        {this.hasMultipleImages() &&
          this.renderNavigationButton("chevron-right", +1)}
      </ImageAreaContainer>
    )
  }

  renderControlsContainer() {
    return (
      <Responsive>
        {({ xs }) => {
          return (
            <ControlsContainer
              flexDirection={xs ? "row-reverse" : "column"}
              justifyContent="center"
              flexBasis={`${
                !xs && this.hasMultipleImages()
                  ? ButtonsContainerWithPageIndicatorsHeight
                  : ButtonsContainerHeight
              }px`}
            >
              {this.renderPageIndicators()}
              {xs && <Flex flexGrow="1" /> /* spacer */}
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <ActionButtonsContainer>
                  <Button href="#TODO">
                    <Icon name="heart" color="black" />
                  </Button>
                  <Button href="#TODO">
                    <Icon name="share" color="black" />
                  </Button>
                </ActionButtonsContainer>
              </Flex>
            </ControlsContainer>
          )
        }}
      </Responsive>
    )
  }

  renderPageIndicators() {
    if (this.props.src.length <= 1) {
      return null
    } else {
      return (
        <PageIndicatorsContainer
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          {[...new Array(this.props.src.length)].map((_, i) => (
            <PageIndicator
              key={i}
              isHighlighted={i === this.state.currentImage}
              onClick={() => this.setState({ currentImage: i })}
            />
          ))}
        </PageIndicatorsContainer>
      )
    }
  }

  render() {
    return (
      <Container flexDirection="column">
        {this.renderImageArea()}
        {this.renderControlsContainer()}
      </Container>
    )
  }
}
