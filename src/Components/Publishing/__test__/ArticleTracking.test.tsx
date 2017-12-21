import "jest-styled-components"

import { mount } from "enzyme"
import React from "react"

import Events from "../../../Utils/events"
import { Article } from "../Article"
import { getArticleFullHref } from "../Constants"
import { StandardArticle } from "../fixtures/Articles"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("Click")
    expect(data.type).toEqual("share")
    done()
  })
  const shareUrl = getArticleFullHref(StandardArticle.slug)
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  article
    .find(`[href='${fbURL}']`)
    .first()
    .simulate("click")
})
