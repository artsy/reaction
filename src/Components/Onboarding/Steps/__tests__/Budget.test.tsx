import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ContextProvider } from "../../../Artsy"
import Budget from "../Budget"

describe("Budget", () => {
  describe("snapshot", () => {
    it("renders the budget step", () => {
      const component = renderer
        .create(
          <ContextProvider>
            <Budget onNextButtonPressed={jest.fn()} />
          </ContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
