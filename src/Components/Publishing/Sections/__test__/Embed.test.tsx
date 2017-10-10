import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Embeds } from "../../fixtures/components"
import Embed from "../embed"

it("renders properly", () => {
  const embed = renderer.create(<Embed section={Embeds[0]} />).toJSON()
  expect(embed).toMatchSnapshot()
})
