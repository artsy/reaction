import { storiesOf } from "@storybook/react"
import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"

import colors from "../../Assets/Colors"
import Button from "../Buttons/Inverted"
import { Checkbox } from "../Checkbox"
import Icon from "../Icon"
import Input from "../Input"
import TextArea from "../TextArea"

const Title = styled.h1`
  ${unica("s40")};
`
const Subtitle = styled.h2`
  ${unica("s16", "regular")};
`

storiesOf("Components/Input", module)
  .add("Default Input", () => (
    <div style={{ padding: 10 }}>
      <Title>Input</Title>
      <Subtitle>Our default input style. Title is optional.</Subtitle>

      <section style={{ padding: 10 }}>
        <Input placeholder="Placeholder" title="Title" block />

        <Input placeholder="Placeholder" title="Title" value="Content" block />

        <Input title="Title" placeholder="Placeholder" block disabled />
      </section>
    </div>
  ))
  .add("Input with Description", () => (
    <div style={{ padding: 10 }}>
      <Title>Input with description</Title>
      <Subtitle>Used when greater context is needed beyond the title.</Subtitle>

      <section style={{ padding: 10 }}>
        <Input
          placeholder="Placeholder"
          title="Title"
          description="Short description"
          block
        />

        <Input
          placeholder="Placeholder"
          title="Title"
          description="Short description"
          value="Content"
          block
        />
      </section>
    </div>
  ))
  .add("Input with Label", () => (
    <div style={{ padding: 10 }}>
      <Title>Input with label</Title>
      <Subtitle>Used for short/simple forms</Subtitle>

      <div style={{ padding: 10 }}>
        <Input
          placeholder="Enter your email address"
          label="Email"
          block
          quick
        />
        <Input
          type="password"
          placeholder="Enter your password"
          label="Password"
          rightView={<Icon name="search" color={colors.graySemibold} />}
          block
          quick
        />
      </div>
    </div>
  ))
  .add("Text Areas", () => (
    <div>
      <TextArea placeholder="Your Message" />
      <TextArea placeholder="Your Message" error />
      <TextArea placeholder="Your Message" disabled />
    </div>
  ))
  .add("Check Boxes", () => (
    <div>
      <div style={{ padding: 10 }}>
        <Checkbox>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox checked>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox error>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox error checked>
          Remember me
        </Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox disabled>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox checked disabled>
          Remember me
        </Checkbox>
      </div>
    </div>
  ))
  .add("Form", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" block />
      <TextArea placeholder="Your Message" block />
    </div>
  ))
  .add("Form w/ Button", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="Email" block />
      <Input type="password" placeholder="Password" block />
      <Button block>Submit</Button>
    </div>
  ))
