import * as React from "react"
import * as renderer from "react-test-renderer"

import Text from "../sections/text"

it("renders properly", () => {
  const text = renderer.create(<Text dangerouslySetInnerHTML={{ __html: "<p>Hello Test.</p>" }} />).toJSON()
  expect(text).toMatchSnapshot()
})
