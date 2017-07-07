import * as React from "react"
import * as renderer from "react-test-renderer"

import FeatureHeader from "../feature_header"
import { FeatureHeaders } from "./fixtures"

it("renders text layout properly", () => {
  const header = renderer.create(<FeatureHeader header={FeatureHeaders[0]} />).toJSON()
  expect(header).toMatchSnapshot()
})

it("renders split layout properly", () => {
  const header = renderer.create(<FeatureHeader header={FeatureHeaders[1]} />).toJSON()
  expect(header).toMatchSnapshot()
})

it("renders full layout properly", () => {
  const header = renderer.create(<FeatureHeader header={FeatureHeaders[2]} />).toJSON()
  expect(header).toMatchSnapshot()
})
