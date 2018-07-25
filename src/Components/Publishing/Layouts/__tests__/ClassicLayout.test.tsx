import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ClassicArticle } from "../../Fixtures/Articles"
import { Header } from "../../Header/Header"
import { Sections } from "../../Sections/Sections"
import { ClassicLayout } from "../ClassicLayout"

it("Renders article header and sections", () => {
  const component = mount(<ClassicLayout article={ClassicArticle} />)

  expect(component.find(Header)).toHaveLength(1)
  expect(component.find(Sections)).toHaveLength(1)
})
