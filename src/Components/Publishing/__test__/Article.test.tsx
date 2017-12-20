import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Article } from "../Article"
import {
  FeatureArticle,
  SeriesArticle,
  StandardArticle,
  VideoArticle
} from "../Fixtures/Articles"

import { ArticleLayout } from '../Layouts/ArticleLayout'
import { SeriesLayout } from '../Layouts/SeriesLayout'
import { VideoLayout } from '../Layouts/VideoLayout'

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-tracking", () => jest.fn(c => d => d))

it("renders standard articles in default layout", () => {
  const article = mount(
    <Article article={StandardArticle} />
  )
  expect(article.find(ArticleLayout).length).toBe(1)
})

it("renders feature articles in default layout", () => {
  const article = mount(
    <Article article={FeatureArticle} />
  )
  expect(article.find(ArticleLayout).length).toBe(1)
})

it("renders series articles in series layout", () => {
  const article = mount(
    <Article article={SeriesArticle} />
  )
  expect(article.find(SeriesLayout).length).toBe(1)
})

it("renders series articles in series layout", () => {
  const article = mount(
    <Article article={VideoArticle} />
  )
  expect(article.find(VideoLayout).length).toBe(1)
})
