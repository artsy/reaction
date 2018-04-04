import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { FeatureArticle, NewsArticle } from "../../Fixtures/Articles"
import { NewsPanel } from "../NewsPanel"

it("Renders a news panel properly", () => {
  const component = renderer
    .create(<NewsPanel articles={[NewsArticle]} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders article headlines", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.text()).toMatch(NewsArticle.title)
  expect(wrapper.text()).toMatch(FeatureArticle.title)
})
