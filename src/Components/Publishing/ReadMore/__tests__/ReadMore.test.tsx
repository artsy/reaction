import PropTypes from "prop-types"
import { mount } from "enzyme"
import "jest-styled-components"
import { extend } from "lodash"
import React from "react"
import { StandardArticle } from "../../Fixtures/Articles"
import {
  FullscreenViewerContext,
  FullscreenViewerContextTypes,
  wrapperWithContext,
  WrapperWithFullscreenContext,
} from "../../Fixtures/Helpers"
import { Sections } from "../../Sections/Sections"
import { ReadMoreWrapper } from "../ReadMoreWrapper"

jest.useFakeTimers()

describe("ReadMore", () => {
  const getWrapper = (readMoreProps, sectionsProps) => {
    return mount(
      WrapperWithFullscreenContext(
        <ReadMoreWrapper {...readMoreProps}>
          <Sections {...sectionsProps} />
        </ReadMoreWrapper>
      )
    )
  }

  let readMoreProps
  let sectionsProps
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        top: 100,
        bottom: 300,
      }
    })
    readMoreProps = {
      hideButton: jest.fn(),
      isTruncated: true,
    }
    sectionsProps = {
      article: StandardArticle,
    }
  })

  it("finds the optimal truncation height", () => {
    const viewer = getWrapper(readMoreProps, sectionsProps)
      .childAt(0)
      .instance()
    jest.runAllTimers()
    expect(viewer.state.truncationHeight).toEqual(200)
  })

  it("truncates articles with toolTips", () => {
    const context = extend(FullscreenViewerContext, {
      tooltipsData: { artists: [], genes: [] },
    })
    const contextTypes = extend(FullscreenViewerContextTypes, {
      tooltipsData: PropTypes.object,
    })
    sectionsProps.showTooltips = true
    const viewer = mount(
      wrapperWithContext(
        context,
        contextTypes,
        <ReadMoreWrapper isTruncated hideButton={jest.fn()}>
          <Sections {...sectionsProps} />
        </ReadMoreWrapper>
      )
    )
      .childAt(0)
      .instance()
    jest.runAllTimers()
    expect(viewer.state.truncationHeight).toEqual(200)
  })

  it("shows the whole article when not truncated", () => {
    readMoreProps.isTruncated = false
    const viewer = getWrapper(readMoreProps, sectionsProps)
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
    sectionsProps.article = extend({}, StandardArticle, {
      sections: [
        {
          type: "text",
          body: "<p>Tiny Article</p>",
        },
      ],
    })
    const viewer = getWrapper(readMoreProps, sectionsProps)
      .childAt(0)
      .instance()
    jest.runAllTimers()
    expect(viewer.state.truncationHeight).toEqual("100%")
    expect(readMoreProps.hideButton).toBeCalled()
  })
})
