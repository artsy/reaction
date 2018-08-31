import { shallow } from "enzyme"
import "jest-styled-components"
import React from "react"

import { BannerWrapper } from "../Banner"

import { StandardArticle } from "../../Fixtures/Articles"

describe("Banner", () => {
  it("it sets state appropriately based on scroll direction", () => {
    const aWindow: any = window

    const wrapper = shallow(<BannerWrapper article={StandardArticle} />)
    const article = wrapper.instance() as any

    // User scrolls back up which should show the banner
    article.handleScroll()
    expect(article.state.showCtaBanner).toBe(false)

    aWindow.scrollY = 500
    article.handleScroll()
    wrapper.update()
    expect(article.state.showCtaBanner).toBe(true)
  })
})
