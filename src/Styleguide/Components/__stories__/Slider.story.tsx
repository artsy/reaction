import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../Utils/Section"
import { Image } from "../../Elements/Image"
import { Slider, LargeSlider, SmallSlider } from "../../Components/Slider"

storiesOf("Styleguide/Components", module).add("Slider", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Slider">
        <Slider>
          <Image src="https://picsum.photos/400/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/500/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/300/200j/?random" />
        </Slider>
      </Section>
      <Section title="Small Slider">
        <SmallSlider width="50%">
          <Image src="https://picsum.photos/400/212/?random" />
          <Image src="https://picsum.photos/200/212/?random" />
          <Image src="https://picsum.photos/500/212/?random" />
          <Image src="https://picsum.photos/200/212/?random" />
          <Image src="https://picsum.photos/300/212/?random" />
        </SmallSlider>
      </Section>
      <Section title="Large Slider">
        <LargeSlider>
          <Image src="https://picsum.photos/400/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/500/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/300/200/?random" />
        </LargeSlider>
      </Section>
    </React.Fragment>
  )
})
