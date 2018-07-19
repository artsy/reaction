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
import { FeatureBasicHeader, VideoContainer } from "../FeatureBasicHeader"
import { FeatureInnerContent } from "../FeatureInnerContent"

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
    props.article = FeatureBasicVideoArticle
    const component = getWrapper(props)
    component
      .find(VideoContainer)
      .at(0)
      .simulate("click")
    const trackingData = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackingData.action).toBe("Click")
    expect(trackingData.label).toBe("Track Basic feature video click")
    expect(trackingData.impression_type).toBe("sa_basic_feature_video")
    expect(trackingData.context_type).toBe("article_fixed")
  })

  it("Renders editImage", () => {
    props.editImage = EditableChild("Image")
    const component = getWrapper(props)
    expect(component.text()).toMatch("Child Image")
  })
})
