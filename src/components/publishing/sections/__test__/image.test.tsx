import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import { Images } from "../../fixtures/components"
import Image from "../image"

it("renders properly", () => {
  const image = renderer.create(<Image image={Images[1]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a long caption properly", () => {
  const image = renderer.create(<Image image={Images[2]} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a react child as caption properly", () => {
  const image = renderer
    .create(
      <Image image={Images[2]}>
        <div><p>A React child as caption.</p></div>
      </Image>
    )
    .toJSON()
  expect(image).toMatchSnapshot()
})
