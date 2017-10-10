import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { StandardArticle } from "../../fixtures/articles"
import Header from "../header"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("Standard Header", () => {
  it("renders standard header properly", () => {
    const header = renderer.create(<Header article={StandardArticle} />).toJSON()
    expect(header).toMatchSnapshot()
  })
  it("renders standard header with children properly", () => {
    const header = renderer
      .create(
        <Header article={StandardArticle}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
        </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})
