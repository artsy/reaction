import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { RelatedCanvas } from "../../fixtures/components"
import RelatedArticlesCanvas from "../related_articles_canvas"

it("renders the related articles canvas", () => {
  const related = renderer
    .create(<RelatedArticlesCanvas vertical={{ name: "Art Market" }} articles={RelatedCanvas} />)
    .toJSON()
  expect(related).toMatchSnapshot()
})
