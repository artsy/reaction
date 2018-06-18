import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ImageCarousel } from "../ImageCarousel"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"

function generateStory(imageCount: number) {
  const src = (value: string) =>
    [...new Array(imageCount)].map((_, i) => `${value}/?image=${i}`)
  return () => {
    return (
      <React.Fragment>
        <Section title="Short portrait">
          <Col sm="8">
            <ImageCarousel src={src("https://picsum.photos/300/400")} />
          </Col>
        </Section>
        <Section title="Tall portrait">
          <Col sm="8">
            <ImageCarousel src={src("https://picsum.photos/400/2000")} />
          </Col>
        </Section>
        <Section title="Narrow landscape">
          <Col sm="8">
            <ImageCarousel src={src("https://picsum.photos/500/400")} />
          </Col>
        </Section>
        <Section title="Wide landscape">
          <Col sm="8">
            <ImageCarousel src={src("https://picsum.photos/2000/400")} />
          </Col>
        </Section>
      </React.Fragment>
    )
  }
}

storiesOf("Styleguide/Artwork/ImageCarousel", module)
  .add("With a single image", generateStory(1))
  .add("With multiple images", generateStory(3))
