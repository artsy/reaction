import * as ReactTestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import AcbThankYou from "../index"

describe("ACB Thank You", () => {
  it("renders the snapshot", () => {
    const thankYou = renderer.create(AcbThankYou({}))
    expect(thankYou).toMatchSnapshot()
  })

  it("renders the correct content", () => {
    const thankYou = ReactTestUtils.renderIntoDocument(AcbThankYou({})) as any
    const pTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(thankYou, "p")
    const earlyAccessTag = pTags.find(tag => tag.textContent === "EARLY ACCESS")
    expect(earlyAccessTag).toBeTruthy()
    const divTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(thankYou, "div")
    const titleTag = divTags.find(tag => tag.textContent === "Artsy Collector Loyalty Program")
    expect(titleTag).toBeTruthy()
  })
})
