import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { RelatedPanel } from "../../Fixtures/Components"
import { RelatedArticlesPanel } from "../RelatedArticlesPanel"

it("renders the related articles panel", () => {
  const related = renderer.create(<RelatedArticlesPanel articles={RelatedPanel} />).toJSON()
  expect(related).toMatchSnapshot()
})
