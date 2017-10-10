import * as ReactTestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import ThreeWThankYou from "../index"

describe("3-way Handshake Thank You", () => {
  it("renders the snapshot", () => {
    const thankYou = renderer.create(ThreeWThankYou({ userName: "Percy" }))
    expect(thankYou).toMatchSnapshot()
  })

  it("renders the correct content", () => {
    const thankYou = ReactTestUtils.renderIntoDocument(ThreeWThankYou({ userName: "Percy" })) as any
    const divTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(thankYou, "div")
    const titleTag = divTags.find(tag => tag.textContent === "Thank you, Percy")
    expect(titleTag).toBeTruthy()
  })
})
