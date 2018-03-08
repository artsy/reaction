import { mount } from "enzyme"
import "jest-styled-components"
import jsonp from "jsonp"
import React from "react"
import {
  SocialEmbedInstagram,
  SocialEmbedTwitter,
} from "../../Fixtures/Components"
import { SocialEmbed } from "../SocialEmbed"

jest.mock("jsonp", () => jest.fn())

describe("Social Embed", () => {
  it("fetches and embeds instagram html", () => {
    const response = {
      html: "<blockquote>Instagram</blockquote>",
    }
    const component = mount(<SocialEmbed section={SocialEmbedInstagram} />)
    expect(jsonp.mock.calls[0][0]).toMatch("api.instagram.com")
    jsonp.mock.calls[0][1](null, response)
    expect(component.find(SocialEmbed).html()).toMatch(response.html)
  })

  it("fetches and embeds twitter html", () => {
    const response = { html: "<blockquote>Twitter</blockquote>" }
    const component = mount(<SocialEmbed section={SocialEmbedTwitter} />)
    expect(jsonp.mock.calls[1][0]).toMatch("publish.twitter.com")
    jsonp.mock.calls[1][1](null, response)
    expect(component.find(SocialEmbed).html()).toMatch(response.html)
  })
})
