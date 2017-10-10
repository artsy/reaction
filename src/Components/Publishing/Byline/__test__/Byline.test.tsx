import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { StandardArticle } from "../../fixtures/articles"
import Byline from "../byline"

describe("Byline", () => {
  it("renders a byline", () => {
    const byline = renderer.create(<Byline article={StandardArticle} layout={"split"} />)
    expect(byline).toMatchSnapshot()
  })
})
