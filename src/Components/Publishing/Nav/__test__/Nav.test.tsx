import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { FeatureArticle, SponsoredArticle } from "../../Fixtures/Articles"
import { Nav } from "../Nav"

describe("Nav", () => {
  it("renders a Nav", () => {
    const nav = renderer.create(<Nav article={FeatureArticle} />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a transparent nav", () => {
    const nav = renderer.create(<Nav article={FeatureArticle} transparent/>)
    expect(nav).toMatchSnapshot()
  })
  it("renders a sponsored nav", () => {
    const nav = renderer.create(<Nav article={SponsoredArticle} />)
    expect(nav).toMatchSnapshot()
  })
})
