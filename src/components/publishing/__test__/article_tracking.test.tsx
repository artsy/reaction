import { mount } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import Events from "../../../utils/events"
import Article from "../article"
import { StandardArticle } from "../fixtures/articles"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("Article share")
    done()
  })
  const shareUrl = `http://www.artsy.net/article/${StandardArticle.slug}`
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  article.find(`[href='${fbURL}']`).first().simulate("click")
})
