import * as React from "react"
import * as renderer from "react-test-renderer"
import { Text } from "./fixtures/components"

import TextContainer from "../sections/text_container"

it("renders classic text properly", () => {
  const text = renderer.create(<TextContainer html={Text.classic} layout="classic" />).toJSON()
  expect(text).toMatchSnapshot()
})

it("renders feature text properly", () => {
  const text = renderer.create(<TextContainer html={Text.feature} layout="feature" />).toJSON()
  expect(text).toMatchSnapshot()
})

it("renders standard text properly", () => {
  const text = renderer.create(<TextContainer html={Text.standard} layout="standard" />).toJSON()
  expect(text).toMatchSnapshot()
})
