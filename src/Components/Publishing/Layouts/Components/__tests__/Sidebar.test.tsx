import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { EmailPanel } from "../../../Email/EmailPanel"
import { RelatedPanel } from "../../../Fixtures/Components"
import { RelatedArticlesPanel } from "../../../RelatedArticles/RelatedArticlesPanel"
import { Sidebar } from "../Sidebar"

jest.mock("../../../Sections/FullscreenViewer/withFullScreen", () => ({
  withFullScreen: x => x,
}))

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
