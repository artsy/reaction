import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { StandardArticle } from "../../Fixtures/Articles"
import { ShareDate } from "../ShareDate"

it("renders ShareDate properly", () => {
  const share = renderer
    .create(
      <ShareDate
        article={StandardArticle}
      />
    ).toJSON()
  expect(share).toMatchSnapshot()
})
