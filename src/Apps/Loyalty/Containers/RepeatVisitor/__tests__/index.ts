import * as ReactTestUtils from "react-dom/test-utils"
import * as renderer from "react-test-renderer"

import RepeatVisitor from "../index"

describe("RepeatVisitor", () => {
  it("renders the snapshot", () => {
    const repeatVisitor = renderer.create(RepeatVisitor({}))
    expect(repeatVisitor).toMatchSnapshot()
  })

  it("renders the correct content", () => {
    const repeatVisitor: any = ReactTestUtils.renderIntoDocument(RepeatVisitor({}))
    const divTags = ReactTestUtils.scryRenderedDOMComponentsWithTag(repeatVisitor, "div")
    const titleTag = divTags.find(tag => tag.textContent === "Your purchases are being reviewed")
    expect(titleTag).toBeTruthy()
  })
})
