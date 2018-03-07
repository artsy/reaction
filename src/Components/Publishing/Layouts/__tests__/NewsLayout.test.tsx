import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsArticle } from "../../Fixtures/Articles"
import { NewsLayout } from "../NewsLayout"

it("renders the news layout properly", () => {
  const series = renderer.create(<NewsLayout article={NewsArticle} />).toJSON()
  expect(series).toMatchSnapshot()
})
