import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { RelatedPanel } from "../../fixtures/components"
import RelatedArticlesPanel from "../related_articles_panel"

it("renders the related articles panel", () => {
  const related = renderer.create(<RelatedArticlesPanel articles={RelatedPanel} />).toJSON()
  expect(related).toMatchSnapshot()
})
