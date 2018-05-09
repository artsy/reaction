import { mount } from "enzyme"
import "jest-styled-components"
import { extend } from "lodash"
import React from "react"
import { StandardArticle } from "../../Fixtures/Articles"
import { WrapperWithFullscreenContext } from "../../Fixtures/Helpers"
import { Sections } from "../../Sections/Sections"
import { ReadMoreWrapper } from "../ReadMoreWrapper"

jest.useFakeTimers()

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
    const readMore = WrapperWithFullscreenContext(
      <ReadMoreWrapper isTruncated hideButton={jest.fn()}>
        <Sections article={StandardArticle} />
      </ReadMoreWrapper>
    )
    const viewer = mount(readMore)
      .childAt(0)
      .instance()
    jest.runAllTimers()
    expect(viewer.state.truncationHeight).toEqual(200)
  })

  it("shows the whole article when not truncated", () => {
    const readMore = WrapperWithFullscreenContext(
      <ReadMoreWrapper isTruncated={false} hideButton={jest.fn()}>
        <Sections article={StandardArticle} />
      </ReadMoreWrapper>
    )
    const viewer = mount(readMore)
    jest.runAllTimers()
    expect(viewer.childAt(0).instance().state.truncationHeight).toEqual("100%")
    expect(
      viewer
        .find("div")
        .at(0)
        .prop("style")
    ).toEqual({
      height: "100%",
      overflow: "auto",
    })
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
    const readMore = WrapperWithFullscreenContext(
      <ReadMoreWrapper isTruncated hideButton={hideButton}>
        WrapperWithFullscreenContext(<Sections article={smallArticle} />)
      </ReadMoreWrapper>
    )
    const viewer = mount(readMore)
      .childAt(0)
      .instance()
    jest.runAllTimers()
    expect(viewer.state.truncationHeight).toEqual("100%")
    expect(hideButton).toBeCalled()
  })
})
