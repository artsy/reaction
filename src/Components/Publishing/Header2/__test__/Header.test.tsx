import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ClassicArticle, StandardArticle } from "../../Fixtures/Articles"
import { Header } from "../Header"
import { ClassicHeader } from "../Layouts/ClassicHeader"
import { StandardHeader } from "../Layouts/StandardHeader"

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

  it("Renders standard header if standard layout", () => {
    props.article = StandardArticle
    const component = getWrapper(props)
    expect(component.find(StandardHeader)).toHaveLength(1)
  })
})
