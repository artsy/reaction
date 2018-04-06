import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"

import { FeatureArticle, NewsArticle } from "../../Fixtures/Articles"
import { NewsPanel } from "../NewsPanel"

it("Renders article headlines", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.text()).toMatch(NewsArticle.title)
  expect(wrapper.text()).toMatch(FeatureArticle.title)
})
