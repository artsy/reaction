import { EmailPanel } from "Components/Publishing/Email/EmailPanel"
import { RelatedPanel } from "Components/Publishing/Fixtures/Components"
import { RelatedArticlesPanel } from "Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Sidebar } from "../Sidebar"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

const DisplayPanel = () => {
  return <div>Display Panel</div>
}
it("renders display panel", () => {
  const sidebar = mount(<Sidebar DisplayPanel={DisplayPanel} />)
  expect(sidebar.find(DisplayPanel).length).toBe(1)
})

it("renders related articles", () => {
  const sidebar = mount(<Sidebar relatedArticlesForPanel={RelatedPanel} />)
  expect(sidebar.find(RelatedArticlesPanel).length).toBe(1)
})

it("renders email signup", () => {
  const sidebar = mount(<Sidebar emailSignupUrl="artsy.net" />)
  expect(sidebar.find(EmailPanel).length).toBe(1)
})
