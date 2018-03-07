import React from "react"
import renderer from "react-test-renderer"
import { NewsArticle } from "../../Fixtures/Articles"
import { NewsByline } from "../NewsByline"

describe("News Byline", () => {
  it("renders properly", () => {
    const byline = renderer.create(<NewsByline article={NewsArticle} />)
    expect(byline).toMatchSnapshot()
  })
  it("renders without a news source", () => {
    const article = NewsArticle
    article.news_source = {}

    const byline = renderer.create(<NewsByline article={NewsArticle} />)
    expect(byline).toMatchSnapshot()
  })
})
