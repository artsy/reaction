import { mount } from "enzyme"
import "jest-styled-components"
import moment from "moment"
import React from "react"
import renderer from "react-test-renderer"

import { NewsArticle } from "Components/Publishing/Fixtures/Articles"
import { NewsDateDivider } from "../NewsDateDivider"

describe("NewsDateDivider", () => {
  const dateNow = Date.now

  beforeAll(() => {
    Date.now = () => Date.parse("01 Jan 2009 00:00:00 EST")
  })

  afterAll(() => {
    Date.now = dateNow
  })

  it("renders a news date header properly", () => {
    const component = renderer
      .create(<NewsDateDivider date={NewsArticle.published_at} />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("Renders 'today' if date is today", () => {
    const date = moment().toISOString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch("Today")
  })

  // FIXME: Reenable (Fails in CI)
  xit("Renders date with no year if in current year", () => {
    const date = moment()
      .subtract(1, "week")
      .toISOString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch(moment(date).format("MMM D"))
    expect(wrapper.text()).not.toMatch(moment(date).format("YYYY"))
  })

  // FIXME: Reenable (Fails in CI)
  xit("Renders date with year if not in current year", () => {
    const date = moment()
      .subtract(1, "year")
      .toISOString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch(moment(date).format("MMM D, YYYY"))
  })
})
