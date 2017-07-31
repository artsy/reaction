import * as React from "react"
import * as renderer from "react-test-renderer"
import Embed from "../sections/embed"
import { Embeds } from "./fixtures"

it("renders properly", () => {
  const artwork = renderer.create(<Embed section={Embeds[0]} />).toJSON()
  expect(artwork).toMatchSnapshot()
})
