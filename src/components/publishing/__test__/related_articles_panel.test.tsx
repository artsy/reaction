import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Related } from "../fixtures/components"
import RelatedArticlesPanel from "../related_articles_panel"

it("renders a saved caption properly", () => {
  const related = renderer.create(<RelatedArticlesPanel articles={Related} />).toJSON()
  expect(related).toMatchSnapshot()
})
