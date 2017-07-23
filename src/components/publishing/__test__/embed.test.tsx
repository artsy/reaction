import * as React from "react"
import * as renderer from "react-test-renderer"

import Embed from "../embed"

it("renders properly", () => {
  const artwork = renderer
    .create(<Embed src={"http://files.artsy.net/documents/1parrasch.html"} height={1000} mobileHeight={1300} />)
    .toJSON()
  expect(artwork).toMatchSnapshot()
})
