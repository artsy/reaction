import { mount } from "enzyme"
import "jest-styled-components"
import { extend } from "lodash"
import * as React from "react"
import { StandardArticle } from "../../fixtures/articles"
import Sections from "../../sections/sections"
import ReadMoreWrapper from "../read_more_wrapper"

describe("ReadMore", () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        top: 100,
        bottom: 300,
      }
    })
  })

  it("finds the optimal truncation height", () => {
    const readMore = (
      <ReadMoreWrapper isTruncated hideButton={jest.fn()}>
        <Sections article={StandardArticle} />
      </ReadMoreWrapper>
    )
    const viewer = mount(readMore)
    expect(viewer.state().truncationHeight).toEqual(200)
  })

  it("calls hideButton when truncation is too small", () => {
    const smallArticle = extend({}, StandardArticle, {
      sections: [
        {
          type: "text",
          body: "<p>Tiny Article</p>",
        },
      ],
    })
    const hideButton = jest.fn()
    const readMore = (
      <ReadMoreWrapper isTruncated hideButton={hideButton}>
        <Sections article={smallArticle} />
      </ReadMoreWrapper>
    )
    const viewer = mount(readMore)
    expect(viewer.state().truncationHeight).toEqual("100%")
    expect(hideButton).toBeCalled()
  })
})
