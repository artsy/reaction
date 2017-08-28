import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../../fixtures/components"
import Caption from "../caption"

it("renders properly", () => {
  const viewer = renderer.create(<Caption section={Images[0]} total={10} index={2} open />).toJSON()
  expect(viewer).toMatchSnapshot()
})
