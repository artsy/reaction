import { mount, shallow } from "enzyme"
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

it("indexes and titles images", () => {
  const article = shallow(<Article article={StandardArticle} />)
  expect(article.state("article").sections[4].images[0].setTitle).toBe("A World Without Capitalism")
  expect(article.state("article").sections[4].images[0].index).toBe(0)
  expect(article.state("article").sections[4].images[1].index).toBe(1)
  expect(article.state("article").sections[6].images[0].index).toBe(3)
  expect(article.state("article").sections[6].images[1].index).toBe(4)
})

it("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("share article")
    done()
  })
  const shareUrl = `http://www.artsy.net/article/${StandardArticle.slug}`
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  article.find(`[href='${fbURL}']`).simulate("click")
})
