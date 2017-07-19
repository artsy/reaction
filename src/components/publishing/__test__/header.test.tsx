import * as React from "react"
import * as renderer from "react-test-renderer"
import _ from "underscore"

import Header from "../header/header"
import { Articles, HeroSections } from "./fixtures"

it("renders feature text header properly", () => {
  const article = _.extend({}, Articles[2], { hero_section: HeroSections[0] })
  const header = renderer.create(<Header article={article} />).toJSON()
  expect(header).toMatchSnapshot()
})

it("renders feature split header properly", () => {
  const article = _.extend({}, Articles[2], { hero_section: HeroSections[1] })
  const header = renderer.create(<Header article={article} />).toJSON()
  expect(header).toMatchSnapshot()
})

it("renders feature full header properly", () => {
  const article = _.extend({}, Articles[2], { hero_section: HeroSections[2] })
  const header = renderer.create(<Header article={article} />).toJSON()
  expect(header).toMatchSnapshot()
})

it("renders standard header properly", () => {
  const header = renderer.create(<Header article={Articles[1]} />).toJSON()
  expect(header).toMatchSnapshot()
})
