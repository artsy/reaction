import { FeatureArticle } from "Components/Publishing/Fixtures/Articles"
import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import { mount } from "enzyme"
import React from "react"
import { Eoy2018Artists } from "../Components/Eoy2018Artists"
import { Eoy2018Culture } from "../Components/Eoy2018Culture"
import { EditorialFeature } from "../EditorialFeature"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("EditorialFeature", () => {
  let props: ArticleProps
  const getWrapper = (passedProps = props) => {
    return mount(<EditorialFeature {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: FeatureArticle,
    }
  })

  it("Renders template for feature layout by default", () => {
    props.customEditorial = "COOL_ARTICLE"
    const component = getWrapper(props)
    expect(component.find(FeatureLayout)).toBeTruthy()
  })

  it("Renders template for EOY_2018_1 article", () => {
    props.customEditorial = "EOY_2018_1"
    const component = getWrapper(props)
    expect(component.find(Eoy2018Artists)).toBeTruthy()
  })

  it("Renders template for EOY_2018_2 article", () => {
    props.customEditorial = "EOY_2018_2"
    const component = getWrapper(props)
    expect(component.find(Eoy2018Culture)).toBeTruthy()
  })
})
