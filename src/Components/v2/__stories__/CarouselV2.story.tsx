import { Box, Image } from "@artsy/palette"
import { artworkBricks, images } from "Apps/__tests__/Fixtures/Carousel"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import {
  Carousel,
  CarouselServer,
  LargeCarousel,
  SmallCarousel,
} from "Components/v2/CarouselV2"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

storiesOf("Styleguide/Components", module).add("CarouselV2", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Carousel">
        <Box width="70%">
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
        </Box>
      </Section>
      <Section title="Small Carousel">
        <Box width="50%">
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
        </Box>
      </Section>
      <Section title="Large Carousel">
        <Box width="70%">
          <LargeCarousel
            data={images}
            height={300}
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
        </Box>
      </Section>
      <Section title="CarouselServer: SSR carousel version">
        <Box width="70%">
          <CarouselServer
            data={images}
            height={300}
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
        </Box>
      </Section>
      <Section title="Large Carousel with WrapAround">
        <Box width="70%">
          <LargeCarousel
            data={images}
            height={300}
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
        </Box>
      </Section>
      <Section title="Artwork Brick">
        <Box width="70%">
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
        </Box>
      </Section>
      <Section title="Custom Arrows with defaults">
        <Box width="70%">
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
        </Box>
      </Section>
      <Section title="Custom Arrows ">
        <Box width="70%">
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
            renderLeftArrow={({ getFlickity }) => {
              return (
                <Box
                  onClick={() => {
                    getFlickity && getFlickity.previous()
                  }}
                >
                  Prev
                </Box>
              )
            }}
            renderRightArrow={({ getFlickity }) => {
              return (
                <Box
                  onClick={() => {
                    getFlickity && getFlickity.next()
                  }}
                >
                  Next
                </Box>
              )
            }}
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
