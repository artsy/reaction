import { Box, Flex, Image } from "@artsy/palette"
import { artworkBricks, images } from "Apps/__tests__/Fixtures/Carousel"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

import {
  Carousel,
  LargeCarousel,
  SmallCarousel,
} from "Components/v2/CarouselV3"

storiesOf("Styleguide/Components/CarouselV3", module)
  .add("Responsive Carousel", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Small Carousel", () => {
    return (
      <Container width="50%">
        <SmallCarousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Large Carousel", () => {
    return (
      <Container>
        <LargeCarousel
          data={images}
          height="300px"
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Large Carousel with WrapAround", () => {
    return (
      <Container width="70%">
        <LargeCarousel
          showArrows
          data={images}
          height="300px"
          options={{ wrapAround: true }}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Carousel with ArtworkBricks", () => {
    return (
      <Container>
        <RelayStubProvider>
          <Carousel
            data={artworkBricks}
            render={artwork => {
              const {
                node: {
                  image: { aspect_ratio },
                },
              } = artwork
              return (
                <FillwidthItem
                  artwork={artwork.node}
                  targetHeight={200}
                  imageHeight={200}
                  width={200 * aspect_ratio}
                  margin={20}
                />
              )
            }}
          />
        </RelayStubProvider>
      </Container>
    )
  })

  .add("Custom arrows with defaults", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
          renderLeftArrow={({ Arrow }) => {
            return (
              <Box top={10} position="relative" bg="black10">
                <Arrow />
              </Box>
            )
          }}
          renderRightArrow={({ Arrow }) => {
            return (
              <Box top={10} position="relative" bg="black10">
                <Arrow />
              </Box>
            )
          }}
        />
      </Container>
    )
  })

  .add("Custom arrows", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
          renderLeftArrow={({ flickity }) => {
            return (
              <Box
                onClick={() => {
                  flickity.previous()
                }}
              >
                Prev
              </Box>
            )
          }}
          renderRightArrow={({ flickity }) => {
            return (
              <Box
                onClick={() => {
                  flickity.next()
                }}
              >
                Next
              </Box>
            )
          }}
        />
      </Container>
    )
  })

const Container = ({ children, ...props }) => {
  return (
    <Flex width="100%" justifyContent="center">
      <Box width="70%" {...props}>
        {children}
      </Box>
    </Flex>
  )
}
