import "jest-styled-components"
import * as _ from "lodash"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { FeatureArticle, SuperArticle } from "../../Fixtures/Articles"
import { HeroSections } from "../../Fixtures/Components"
import { Header } from "../Header"

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

  it("renders feature full header without a deck properly", () => {
    const decklessHero = _.extend({}, HeroSections[2], { deck: null })
    const article = _.extend({}, FeatureArticle, { hero_section: decklessHero })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders superArticle full header properly", () => {
    const article = _.extend({}, SuperArticle, { hero_section: HeroSections[2] })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })
})
