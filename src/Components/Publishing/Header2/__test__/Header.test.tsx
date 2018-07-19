import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Header } from "../Header"
import { ClassicHeader } from "../Layouts/ClassicHeader"

import { ClassicArticle } from "../../Fixtures/Articles"

describe("Header", () => {
  const getWrapper = props => {
    return mount(<Header {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: ClassicArticle,
    }
  })

  it("Renders classic header by default", () => {
    delete props.article.layout
    const component = getWrapper(props)
    expect(component.find(ClassicHeader)).toHaveLength(1)
  })

  it("Renders classic header if classic layout", () => {
    delete props.article.layout
    const component = getWrapper(props)
    expect(component.find(ClassicHeader)).toHaveLength(1)
  })
})
