import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import SelectableLink from "../SelectableLink"

describe("SelectableLink", () => {
  describe("snapshot", () => {
    it("renders a selectable link", () => {
      const component = renderer
        .create(
          <SelectableLink
            href="/artist/andy-warhol"
            text="Andy"
            onSelect={jest.fn()}
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
