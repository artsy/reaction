import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Embeds } from "../../Fixtures/Components"
import { Embed } from "../Embed"

it("renders properly", () => {
  const embed = renderer.create(<Embed section={Embeds[0]} />).toJSON()
  expect(embed).toMatchSnapshot()
})
