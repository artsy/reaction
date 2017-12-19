import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SectionContainer } from "../SectionContainer"
import { Text } from "../Text"

it("renders overflow_fillwidth properly", () => {
  const section = {
    layout: "overflow_fillwidth",
    body: "<p>Hello, world!</p>",
    type: "text",
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout} type={section.type}>
        <Text html={section.body} layout="standard" />
      </SectionContainer>
    )
    .toJSON()
  expect(sectionContainer).toMatchSnapshot()
})

it("renders fillwidth properly", () => {
  const section = {
    layout: "fillwidth",
    body: "<p>Hello, world!</p>",
    type: "text",
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout} type={section.type}>
        <Text html={section.body} layout="standard" />
      </SectionContainer>
    )
    .toJSON()
  expect(sectionContainer).toMatchSnapshot()
})

it("renders column_width properly", () => {
  const section = {
    layout: "column_width",
    body: "<p>Hello, world!</p>",
    type: "text",
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout} type={section.type}>
        <Text html={section.body} layout="standard" />
      </SectionContainer>
    )
    .toJSON()
  expect(sectionContainer).toMatchSnapshot()
})
