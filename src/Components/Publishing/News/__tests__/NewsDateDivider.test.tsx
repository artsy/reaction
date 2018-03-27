import { mount } from "enzyme"
import "jest-styled-components"
import moment from "moment"
import React from "react"
import renderer from "react-test-renderer"

import { NewsArticle } from "../../Fixtures/Articles"
import { NewsDateDivider } from "../NewsDateDivider"

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

it("Renders date with no year if in current year", () => {
  const date = moment()
    .subtract(1, "week")
    .toISOString()
  const wrapper = mount(<NewsDateDivider date={date} />)
  expect(wrapper.text()).toMatch(moment(date).format("MMM D"))
  expect(wrapper.text()).not.toMatch(moment(date).format("YYYY"))
})

it("Renders date with year if not in current year", () => {
  const date = moment()
    .subtract(1, "year")
    .toISOString()
  const wrapper = mount(<NewsDateDivider date={date} />)
  expect(wrapper.text()).toMatch(moment(date).format("MMM D, YYYY"))
})
