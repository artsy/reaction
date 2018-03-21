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
