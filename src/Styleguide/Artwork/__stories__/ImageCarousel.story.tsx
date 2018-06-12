import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ImageCarousel } from "../ImageCarousel"
import { Col } from "Styleguide/Elements/Grid"
import { Section } from "../../Utils/Section"

storiesOf("Styleguide/Artwork", module).add("ImageCarousel", () => {
  return (
    <React.Fragment>
      <Section title="With a short portrait image">
        <Col sm="8">
          <ImageCarousel src="https://picsum.photos/300/400/?random" />
        </Col>
      </Section>
      <Section title="With a tall portrait image">
        <Col sm="8">
          <ImageCarousel src="https://picsum.photos/400/2000/?random" />
        </Col>
      </Section>
      <Section title="With a narrow landscape image">
        <Col sm="8">
          <ImageCarousel src="https://picsum.photos/500/400/?random" />
        </Col>
      </Section>
      <Section title="With a wide landscape image">
        <Col sm="8">
          <ImageCarousel src="https://picsum.photos/2000/400/?random" />
        </Col>
      </Section>
    </React.Fragment>
  )
})

// storiesOf("Styleguide/Artwork", module).add("ImageCarousel", () => {
//   return (
//     <React.Fragment>
//       <Section title="With a tall portrait image">
//         <Col sm="8">
//           <ImageCarousel src="https://picsum.photos/400/2000/?random" />
//         </Col>
//       </Section>
//     </React.Fragment>
//   )
// })
