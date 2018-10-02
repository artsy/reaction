import { Box, Image } from "@artsy/palette"
import { artworkBricks, images } from "Apps/__test__/Fixtures/Carousel"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import {
  Carousel,
  LargeCarousel,
  SmallCarousel,
} from "Styleguide/Components/Carousel"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Carousel", () => {
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
      <Section title="Artwork Brick">
        <Box width="70%">
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
                  useRelay={false}
                />
              )
            }}
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
