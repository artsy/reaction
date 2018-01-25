import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Artists from "../"
import { ContextProvider } from "../../../../Artsy"

jest.mock("../../../../../Utils/metaphysics.ts", () => ({
  metaphysics: jest.fn(),
}))

describe("Artists", () => {
  describe("snapshot", () => {
    it("renders the artist step", () => {
      const component = renderer
        .create(
          <ContextProvider>
            <Artists onNextButtonPressed={jest.fn()} />
          </ContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })
})
