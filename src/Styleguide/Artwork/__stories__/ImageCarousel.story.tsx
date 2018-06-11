import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ImageCarousel } from "../ImageCarousel"
import { Col } from "Styleguide/Elements/Grid"

storiesOf("Styleguide/Artwork/ImageCarousel", module)
  .add("With a single image", () => {
    return (
      <Col sm="8">
        <ImageCarousel />
      </Col>
    )
  })
  .add("With multiple images", () => {
    return <ImageCarousel />
  })
