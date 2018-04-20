import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { StandardArticle } from "../../Fixtures/Articles"
import { Header } from "../Header"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("Standard Header", () => {
  it("renders standard header properly", () => {
    const header = renderer
      .create(<Header article={StandardArticle} />)
      .toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders a date passed as prop", () => {
    const header = mount(
      <Header article={StandardArticle} date={"2017-05-19T13:09:18.567Z"} />
    )
    expect(header.html()).toContain("May 19, 2017 9:09 am")
  })

  it("renders standard header with children properly", () => {
    const header = renderer
      .create(
        <Header article={StandardArticle}>
          <div>Child 0: Vertical</div>
          <div>Child 1: Title</div>
        </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})
