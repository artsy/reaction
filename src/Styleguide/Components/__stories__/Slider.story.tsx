import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { LargeSlider, Slider, SmallSlider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Image } from "Styleguide/Elements/Image"
import { artworkBricks, images } from "Styleguide/Pages/Fixtures/Slider"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Slider", () => {
  return (
    <React.Fragment>
      <Section title="Artwork Brick">
        <Box width="70%">
          <Slider
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
      <Section title="Responsive Slider">
        <Box width="70%">
          <Slider
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
      <Section title="Small Slider">
        <Box width="50%">
          <SmallSlider
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
      <Section title="Large Slider">
        <Box width="70%">
          <LargeSlider
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
    </React.Fragment>
  )
})
