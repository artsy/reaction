import { shallow } from "enzyme"
import "jest-styled-components"
import _ from "lodash"
import * as React from "react"
import { Header } from "../Header"

import {
  ClassicArticle,
  FeatureArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../../Fixtures/Articles"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-responsive-decorator", () => jest.fn(x => x))

describe("Header", () => {
  it("renders lead paragraph on classic article", () => {
    const leadParagraphArticle = _.extend({}, ClassicArticle, {
      lead_paragraph: "<p>Lead paragraph</p>",
    })
    const header = shallow(<Header article={leadParagraphArticle} />)
    expect(header.html()).toContain("Lead paragraph")
  })

  it("renders children on classic article", () => {
    const header = shallow(
      <Header article={ClassicArticle}>
        <div>Title Child</div>
        <div>Lead Paragraph Child</div>
      </Header>
    )
    expect(header.html()).toContain("Title Child")
    expect(header.html()).toContain("Lead Paragraph Child")
  })

  it("renders vertical and title on standard article", () => {
    const header = shallow(<Header article={StandardArticle} />)
    expect(header.html()).toContain("Art Market")
    expect(header.html()).toContain("New York&#x27;s Next Art District")
  })

  it("renders children on standard article", () => {
    const header = shallow(
      <Header article={MissingVerticalStandardArticle}>
        <div>Vertical Child</div>
        <div>Title Child</div>
      </Header>
    )
    expect(header.html()).toContain("Vertical Child")
    expect(header.html()).toContain("Title Child")
  })

  it("renders vertical, title, deck, and image on standard article", () => {
    const header = shallow(<Header article={FeatureArticle} />)
    expect(header.html()).toContain("Creativity")
    expect(header.html()).toContain("What’s the Path to Winning an Art Prize?")
    expect(header.html()).toContain("Lorem Ipsum")
    expect(header.html()).toContain(
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4"
    )
  })

  it("renders children on feature article", () => {
    const MissingVerticalFeatureArticle = _.extend({}, FeatureArticle, {
      vertical: null,
    })
    const header = shallow(
      <Header article={MissingVerticalFeatureArticle}>
        <div>Vertical Child</div>
        <div>Title Child</div>
        <div>Deck Child</div>
        <div>Image Child</div>
      </Header>
    )
    expect(header.html()).toContain("Vertical Child")
    expect(header.html()).toContain("Title Child")
    expect(header.html()).toContain("Deck Child")
    expect(header.html()).toContain("Image Child")
  })
})
