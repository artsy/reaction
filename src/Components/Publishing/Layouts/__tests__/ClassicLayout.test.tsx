import { ClassicArticle } from "Components/Publishing/Fixtures/Articles"
import { Header } from "Components/Publishing/Header/Header"
import { Sections } from "Components/Publishing/Sections/Sections"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ClassicLayout } from "../ClassicLayout"

it("Renders article header and sections", () => {
  const component = mount(<ClassicLayout article={ClassicArticle} />)

  expect(component.find(Header)).toHaveLength(1)
  expect(component.find(Sections)).toHaveLength(1)
})
