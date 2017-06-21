import { storiesOf } from "@storybook/react"
import * as React from "react"

import colors from "../../assets/colors"
import Text from "../text"
import TextLink from "../text_link"
import Title from "../title"

storiesOf("Typography", Title)
  .add("Headings", () => (
    <div>
      <Title titleSize="xxlarge">XXLarge Title: 72px</Title>
      <Title titleSize="xlarge">XLarge Title: 50px</Title>
      <Title titleSize="large">Large Title: 37px</Title>
      <Title titleSize="medium">Medium Title: 30px</Title>
      <Title titleSize="small">Small Title: 25px</Title>
    </div>
  ))
  .add("Text", () => (
    <div>
      <Title>
        Plain Text
      </Title>

      <Text textSize="large">
        Large text: Thank you for your interest in the program.
      </Text>
      <Text>
        Small text: Thank you for your interest in the program.
      </Text>

      <Title>
        Fonts
      </Title>

      <Text textStyle="primary">
        ITC Avant Garde Gothic W04
      </Text>
      <Text textStyle="secondary">
        Adobe Garamond W08
      </Text>

      <Title>
        Alignment
      </Title>

      <Text>
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>
      <Text align="center">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>
      <Text align="end">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>

      <Title>
        Text Color
      </Title>

      <Text align="center" color={colors.graySemibold}>
        Have questions? Get in touch:&nbsp;
        <TextLink href="#">youremail@example.com</TextLink>
      </Text>
    </div>
  ))
