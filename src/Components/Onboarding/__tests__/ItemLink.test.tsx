import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import ItemLink from "../ItemLink"

describe("ItemLink", () => {
  describe("snapshot", () => {
    it("renders an item link", () => {
      const component = renderer
        .create(
          <ItemLink id="123" name="Andy Warhol" image_url="https://image.jpg" />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
