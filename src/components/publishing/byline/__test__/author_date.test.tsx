import { shallow } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Author, Date } from "../author_date"

describe("Author/Date", () => {
  it("renders a single author", () => {
    const authors = [{ name: "Molly Gottschalk" }]
    const author = renderer.create(<Author authors={authors} layout={"split"} />)
    expect(author).toMatchSnapshot()
    const shallowAuthor = shallow(<Author authors={authors} layout={"split"} />)
    expect(shallowAuthor.html()).toContain("Molly Gottschalk")
  })

  it("renders multiple authors", () => {
    const authors = [{ name: "Molly Gottschalk" }, { name: "Kana Abe" }]
    const author = renderer.create(<Author authors={authors} layout={"split"} />)
    expect(author).toMatchSnapshot()
    const shallowAuthor = shallow(<Author authors={authors} layout={"split"} />)
    expect(shallowAuthor.html()).toContain("Molly Gottschalk")
    expect(shallowAuthor.html()).toContain("Kana Abe")
  })

  it("renders the date", () => {
    const date = renderer.create(<Date date="2017-05-19T13:09:18.567Z" layout="split" />)
    expect(date).toMatchSnapshot()
    const shallowDate = shallow(<Date date="2017-05-19T13:09:18.567Z" layout="split" />)
    expect(shallowDate.html()).toContain("May 19, 2017 9:09 am")
  })
})
