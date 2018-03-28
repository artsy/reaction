import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { RelatedCanvas } from "../../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticlesCanvas"

describe("RelatedArticlesCanvas", () => {
  it("renders the related articles canvas", () => {
    const related = renderer
      .create(
        <RelatedArticlesCanvas
          vertical={{ name: "Art Market" }}
          articles={RelatedCanvas}
        />
      )
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders the vertical name if there is one", () => {
    const component = mount(
      <RelatedArticlesCanvas
        vertical={{ name: "Art Market" }}
        articles={RelatedCanvas}
      />
    )
    expect(component.html()).toMatch("Art Market")
  })

  it("renders a default message if there is no vertical", () => {
    const component = mount(<RelatedArticlesCanvas articles={RelatedCanvas} />)
    expect(component.html()).toMatch("More from Artsy Editorial")
  })
})
