import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { ClassicArticle, StandardArticle } from "../../fixtures/articles"
import AuthorDateClassic from "../author_date_classic"
import Header from "../header"

describe("Classic Header", () => {
  it("renders classic header properly", () => {
    const header = renderer.create(<Header article={ClassicArticle} />).toJSON()
    expect(header).toMatchSnapshot()
  })
  it("renders classic header with children properly", () => {
    const header = renderer
      .create(
        <Header article={StandardArticle}>
          <div>Child 0: Title</div>
          <div>Child 1: Lead Paragraph</div>
        </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})

describe("AuthorDate", () => {
  it("renders a single author", () => {
    const author = "Life at Artsy"
    const authors = [{ name: "Molly Gottschalk" }]
    const authorDate = renderer.create(
      <AuthorDateClassic author={author} authors={authors} date={"2017-05-19T13:09:18.567Z"} />
    )
    expect(authorDate).toMatchSnapshot()
  })

  it("renders multiple authors", () => {
    const author = "Life at Artsy"
    const authors = [{ name: "Molly Gottschalk" }, { name: "Kana Abe" }]
    const authorDate = renderer.create(
      <AuthorDateClassic author={author} authors={authors} date={"2017-05-19T13:09:18.567Z"} />
    )
    expect(authorDate).toMatchSnapshot()
  })
})
