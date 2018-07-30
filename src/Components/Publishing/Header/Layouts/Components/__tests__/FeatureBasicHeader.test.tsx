import {
  FeatureBasicArticle,
  FeatureBasicVideoArticle,
} from "Components/Publishing/Fixtures/Articles"
import { EditableChild } from "Components/Publishing/Fixtures/Helpers"
import { Video } from "Components/Publishing/Sections/Video"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import { mockTracking } from "../../../../../../Analytics"
import { FeatureBasicHeader, VideoContainer } from "../FeatureBasicHeader"
import { FeatureInnerContent } from "../FeatureInnerContent"

jest.unmock("react-tracking")

describe("FeatureBasicHeader", () => {
  const getWrapper = props => {
    return mount(<FeatureBasicHeader {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureBasicArticle),
      tracking: {
        trackEvent: jest.fn(),
      },
    }
  })

  it("Renders FeatureInnerContent", () => {
    const component = getWrapper(props)
    expect(component.find(FeatureInnerContent)).toHaveLength(1)
  })

  it("Renders video assets", () => {
    props.article = FeatureBasicVideoArticle
    const component = getWrapper(props)
    expect(component.find(Video)).toHaveLength(1)
  })

  it("Tracks video clicks", () => {
    const { Component, dispatch } = mockTracking(FeatureBasicHeader)
    const component = mount(<Component article={FeatureBasicVideoArticle} />)
    component
      .find(VideoContainer)
      .at(0)
      .simulate("click")

    expect(dispatch).toBeCalledWith({
      action: "Click",
      label: "Basic feature video click",
      impression_type: "sa_basic_feature_video",
      context_type: "article_fixed",
    })
  })

  it("Renders editImage", () => {
    props.editImage = EditableChild("Image")
    const component = getWrapper(props)
    expect(component.text()).toMatch("Child Image")
  })
})
