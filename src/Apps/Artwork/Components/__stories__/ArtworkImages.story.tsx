import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkImagesQueryRenderer } from "../ArtworkImages"
import { ImageCarousel } from "../ImageCarousel"

export function imageData(width: number, height: number, imageIndex?: number) {
  return {
    uri: `https://picsum.photos/${width}/${height}/?${
      imageIndex === undefined ? "random" : `image=${imageIndex}`
    }`,
    aspectRatio: width / height,
  }
}

function generateStory(imageCount: number) {
  const times = cb => [...new Array(imageCount)].map((_, i) => cb(i))
  const src = (width: number, height: number) =>
    times(i => imageData(width, height, i))

  return () => {
    return (
      <React.Fragment>
        <Section title="Short portrait">
          <Col sm="8">
            <ImageCarousel images={src(300, 400)} />
          </Col>
        </Section>
        <Section title="Tall portrait">
          <Col sm="8">
            <ImageCarousel images={src(400, 2000)} />
          </Col>
        </Section>
        <Section title="Narrow landscape">
          <Col sm="8">
            <ImageCarousel images={src(500, 400)} />
          </Col>
        </Section>
        <Section title="Wide landscape">
          <Col sm="8">
            <ImageCarousel images={src(2000, 400)} />
          </Col>
        </Section>
        <Section title="Not loaded yet / Unable to load">
          <Col sm="8">
            <ImageCarousel
              images={times(() => ({
                uri: "http://example.com/this/image/does/not/exist.jpg",
                aspectRatio: 16 / 9,
              }))}
            />
          </Col>
        </Section>
      </React.Fragment>
    )
  }
}

storiesOf("Styleguide/Artwork/ArtworkImages", module)
  .add("With live data", () => {
    return (
      <>
        <Section title="Multiple images">
          <Col sm="8">
            <ArtworkImagesQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
          </Col>
        </Section>
        <Section title="Single image">
          <Col sm="8">
            <ArtworkImagesQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
          </Col>
        </Section>
      </>
    )
  })
  .add("With a single image", generateStory(1))
  .add("With multiple images", generateStory(3))
