import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"
import * as _ from "lodash"

import { ClassicArticle, FeatureArticle, StandardArticle } from "../../fixtures/articles"
import { HeroSections } from "../../fixtures/components"
import AuthorDateClassic from "../author_date_classic"
import Header from "../header"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("feature", () => {
  it("renders feature text header properly", () => {
    const article = _.extend({}, FeatureArticle, { hero_section: HeroSections[0] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature split header properly", () => {
    const article = _.extend({}, FeatureArticle, { hero_section: HeroSections[1] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature full header properly", () => {
    const article = _.extend({}, FeatureArticle, { hero_section: HeroSections[2] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })
  it("renders feature header with children properly", () => {
    const article = _.extend({}, FeatureArticle, { hero_section: HeroSections[2] })
    const header = renderer
      .create(
        <Header article={article}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
          <div>Child 2: Deck</div>
          <div>Child 3: Image</div>
        </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})

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
