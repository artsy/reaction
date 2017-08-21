import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"
import * as _ from "lodash"

import AuthorDate from "../header/author_date"
import Header from "../header/header"
import Articles from "./fixtures/articles"
import { HeroSections } from "./fixtures/components"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("feature", () => {
  it("renders feature text header properly", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[0] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature split header properly", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[1] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature full header properly", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[2] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })
})

describe("Standard Header", () => {
  it("renders standard header properly", () => {
    const header = renderer.create(<Header article={Articles[1]} />).toJSON()
    expect(header).toMatchSnapshot()
  })
})

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
