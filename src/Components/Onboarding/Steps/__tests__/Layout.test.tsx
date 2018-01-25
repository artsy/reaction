import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Layout } from "../Layout"

describe("Layout", () => {
  describe("snapshot", () => {
    it("renders the main layout", () => {
      const component = renderer
        .create(
          <Layout
            onNextButtonPressed={jest.fn()}
            title="Layout Title"
            subtitle="Layout Subtitle"
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
