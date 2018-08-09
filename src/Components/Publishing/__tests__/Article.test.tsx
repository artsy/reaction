import { mount, shallow } from "enzyme"
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

import { MinimalCtaBanner } from "../../MinimalCtaBanner"
import { ArticleWithFullScreen } from "../Layouts/ArticleWithFullScreen"
import { NewsLayout } from "../Layouts/NewsLayout"
import { SeriesLayout } from "../Layouts/SeriesLayout"
import { VideoLayout } from "../Layouts/VideoLayout"

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

it("renders mobile MinimalCtaBanner for standard article layouts", () => {
  const article = shallow(
    <Article article={StandardArticle} isMobile isLoggedIn={false} />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(1)
})

it("renders mobile MinimalCtaBanner for news article layouts", () => {
  const article = shallow(
    <Article article={NewsArticle} isMobile isLoggedIn={false} />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(1)
})

it("renders mobile MinimalCtaBanner for video article layouts", () => {
  const article = shallow(
    <Article article={VideoArticle} isMobile isLoggedIn={false} />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(1)
})

it("does not renders mobile MinimalCtaBanner for standard article layouts for desktop", () => {
  const article = shallow(
    <Article article={StandardArticle} isMobile={false} isLoggedIn={false} />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(0)
})

it("does not renders mobile MinimalCtaBanner for standard article layouts for logged in users", () => {
  const article = shallow(
    <Article article={StandardArticle} isMobile isLoggedIn />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(0)
})

it("does not renders mobile MinimalCtaBanner for series article layouts for logged in users", () => {
  const article = shallow(
    <Article article={SeriesArticle} isMobile isLoggedIn={false} />
  )
  expect(article.find(MinimalCtaBanner).length).toBe(0)
})

it("it sets state appropriately based on scroll direction", () => {
  const aWindow: any = window

  const wrapper = shallow(
    <Article article={StandardArticle} isMobile isLoggedIn />
  )
  const article = wrapper.instance() as any

  // User scrolls back up which should show the banner
  article.handleScroll()
  expect(article.state.showCtaBanner).toBe(false)

  aWindow.scrollY = 500
  article.handleScroll()
  wrapper.update()
  expect(article.state.showCtaBanner).toBe(true)
})
