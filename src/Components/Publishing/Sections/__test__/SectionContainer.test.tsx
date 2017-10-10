import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import SectionContainer from "../section_container"
import Text from "../text"

it("renders overflow_fillwidth properly", () => {
  const section = {
    layout: "overflow_fillwidth",
    body: "<p>Hello, world!</p>",
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout}>
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
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout}>
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
  }
  const sectionContainer = renderer
    .create(
      <SectionContainer layout={section.layout}>
        <Text html={section.body} layout="standard" />
      </SectionContainer>
    )
    .toJSON()
  expect(sectionContainer).toMatchSnapshot()
})
