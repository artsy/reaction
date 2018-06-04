import "jest-styled-components"

import { mount } from "enzyme"
import React from "react"

import Events from "../../../Utils/Events"
import { Article } from "../Article"
import { getArticleFullHref } from "../Constants"
import { StandardArticle } from "../Fixtures/Articles"

jest.mock("react-slick", () => {
  // tslint:disable-next-line:no-shadowed-variable
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("../ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

it("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("Click")
    expect(data.type).toEqual("share")
    done()
  })
  const shareUrl = getArticleFullHref(StandardArticle.slug)
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`
  article
    .find(`[href='${fbURL}']`)
    .first()
    .simulate("click")
})
