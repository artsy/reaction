import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"

import {
  FeatureArticle,
  NewsArticle,
} from "Components/Publishing/Fixtures/Articles"
import { NewsPanel } from "../NewsPanel"

it("Renders article headlines", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.text()).toMatch(NewsArticle.title)
  expect(wrapper.text()).toMatch(FeatureArticle.title)
})

it("Links headlines to article", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.html()).toMatch(`/news/${NewsArticle.slug}`)
  expect(wrapper.html()).toMatch(`/news/${FeatureArticle.slug}`)
})
