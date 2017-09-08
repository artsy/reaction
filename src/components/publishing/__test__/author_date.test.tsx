import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import AuthorDate from "../author_date"

describe("AuthorDate", () => {
  it("renders a single author", () => {
    const authors = [{ name: "Molly Gottschalk" }]
    const authorDate = renderer.create(
      <AuthorDate authors={authors} date={"2017-05-19T13:09:18.567Z"} layout={"split"} />
    )
    expect(authorDate).toMatchSnapshot()
  })

  it("renders multiple authors", () => {
    const authors = [{ name: "Molly Gottschalk" }, { name: "Kana Abe" }]
    const authorDate = renderer.create(
      <AuthorDate authors={authors} date={"2017-05-19T13:09:18.567Z"} layout={"split"} />
    )
    expect(authorDate).toMatchSnapshot()
  })
})
