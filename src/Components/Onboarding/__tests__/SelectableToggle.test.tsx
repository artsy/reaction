import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import SelectableToggle from "../SelectableToggle"

describe("SelectableToggle", () => {
  describe("snapshot", () => {
    it("renders a selectable toggle", () => {
      const component = renderer
        .create(
          <SelectableToggle
            href="/artist/andy-warhol"
            text="Andy"
            selected
            onSelect={jest.fn()}
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
