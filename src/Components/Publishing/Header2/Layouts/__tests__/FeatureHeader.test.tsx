import { FeatureArticle } from "Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import { FeatureTextHeader } from "../Components/FeatureTextHeader"
import { FeatureHeader } from "../FeatureHeader"

describe("Header", () => {
  const getWrapper = props => {
    return mount(<FeatureHeader {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureArticle),
    }
  })

  it("Renders text header by default", () => {
    delete props.article.hero_section.type
    const component = getWrapper(props)
    expect(component.find(FeatureTextHeader)).toHaveLength(1)
  })

  it("Renders text header by for text types", () => {
    props.article.hero_section.type = "text"
    const component = getWrapper(props)
    expect(component.find(FeatureTextHeader)).toHaveLength(1)
  })
})
