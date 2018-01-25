import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ContextProvider } from "../../../Artsy"
import CollectorIntent from "../CollectorIntent"

describe("CollectorIntent", () => {
  describe("snapshot", () => {
    it("renders the collector intent step", () => {
      const component = renderer
        .create(
          <ContextProvider>
            <CollectorIntent onNextButtonPressed={jest.fn()} />
          </ContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
