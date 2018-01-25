import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Artists from "../"
import { ContextProvider } from "../../../../Artsy"

jest.mock("../../../../../Utils/metaphysics.ts", () => ({
  metaphysics: jest.fn(),
}))

describe("Genes", () => {
  describe("snapshot", () => {
    it("renders the gene step", () => {
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
