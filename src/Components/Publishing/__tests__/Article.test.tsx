import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Article } from "../Article"
import {
  FeatureArticle,
  NewsArticle,
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "../Fixtures/Articles"

import { ArticleWithFullScreen } from "../Layouts/ArticleWithFullScreen"
import { NewsLayout } from "../Layouts/NewsLayout"
import { SeriesLayout } from "../Layouts/SeriesLayout"
import { VideoLayout } from "../Layouts/VideoLayout"

jest.mock("react-slick", () => {
  // tslint:disable-next-line:no-shadowed-variable
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-tracking", () => jest.fn(c => d => d))
jest.mock("../ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

it("renders standard articles in fullscreen layout", () => {
  const article = mount(<Article article={StandardArticle} />)
  expect(article.find(ArticleWithFullScreen).length).toBe(1)
})

it("renders feature articles in fullscreen layout", () => {
  const article = mount(<Article article={FeatureArticle} />)
  expect(article.find(ArticleWithFullScreen).length).toBe(1)
})

it("renders series articles in series layout", () => {
  const article = mount(<Article article={SeriesArticle} />)
  expect(article.find(SeriesLayout).length).toBe(1)
})

it("renders video articles in video layout", () => {
  const article = mount(<Article article={VideoArticle} />)
  expect(article.find(VideoLayout).length).toBe(1)
})

it("renders news articles in news layout", () => {
  const article = mount(<Article article={NewsArticle} />)
  expect(article.find(NewsLayout).length).toBe(1)
})
