import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Embeds } from "../../Fixtures/Components"
import Embed from "../Embed"

it("renders properly", () => {
  const embed = renderer.create(<Embed section={Embeds[0]} />).toJSON()
  expect(embed).toMatchSnapshot()
})
