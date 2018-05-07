import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  NewsArticle,
  TextClassicArticle,
  TextFeatureArticle,
  TextStandardArticle,
} from "../../Fixtures/Articles"
import { TextFromArticle } from "../../Fixtures/Helpers"
import { Text } from "../Text"
import { LinkWithTooltip } from "../../ToolTip/LinkWithTooltip"

it("renders classic text properly", () => {
  const text = renderer
    .create(
      <Text html={TextFromArticle(TextClassicArticle)} layout="classic" />
    )
    .toJSON()
  expect(text).toMatchSnapshot()
})

it("renders feature text properly", () => {
  const text = renderer
    .create(
      <Text html={TextFromArticle(TextFeatureArticle)} layout="feature" />
    )
    .toJSON()
  expect(text).toMatchSnapshot()
})

it("renders standard text properly", () => {
  const text = renderer
    .create(
      <Text html={TextFromArticle(TextStandardArticle)} layout="standard" />
    )
    .toJSON()
  expect(text).toMatchSnapshot()
})

it("renders news text properly", () => {
  const text = renderer
    .create(<Text html={TextFromArticle(NewsArticle)} layout="standard" />)
    .toJSON()
  expect(text).toMatchSnapshot()
})

it("Inserts content-end spans if isContentEnd", () => {
  const wrapper = mount(
    <Text
      html={TextFromArticle(TextFeatureArticle)}
      isContentEnd
      layout="standard"
    />
  )
  expect(wrapper.html()).toMatch("content-end")
})

it("Inserts content-end spans in last paragraph, even if another block follows", () => {
  const html = "<p>The end of the article</p><h3>An h3 after</h3>"
  const wrapper = mount(<Text html={html} isContentEnd layout="standard" />)
  expect(wrapper.html()).toMatch(
    `<div class=\"article__text-section sc-bdVaJa jpelOv\" color=\"black\"><div><p>The end of the article<span class=\"content-end\"> </span></p><h3>An h3 after</h3></div></div>`
  )
})

it("Removes content-end spans if not isContentEnd", () => {
  const html =
    "<p>The end of a great article. <span class='content-end> </span></p>"
  const wrapper = mount(<Text html={html} layout="feature" />)
  expect(wrapper.html()).not.toMatch("content-end")
})

it("Should add LinkWithTooltip when artsy link is contained", () => {
  const html = `<p>Amazing content <a href="https://www.artsy.net/artist/banksy">Banksy</a></p>`
  const wrapper = mount(<Text html={html} layout="standard" showTooltip />)
  expect(wrapper.find(LinkWithTooltip)).toHaveLength(1)
})
