import { ArticlesFixture } from "Apps/__test__/Fixtures/Artist/Routes/ArticlesFixture"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "Apps/Artist/Routes/Articles"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

describe("Articles Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <ArticlesRoute artist={ArticlesFixture as any} />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("general behavior", () => {
    beforeAll(() => {
      wrapper = getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("ArticleItem").length).toBe(10)
      expect(wrapper.find("Pagination").length).toBe(1)
      expect(wrapper.find("Pagination").find("button").length).toBe(4)
    })

    it("renders proper article contents", () => {
      // TODO
      expect(true).toBe(true)
    })
  })

  describe("xs", () => {
    beforeAll(() => {
      wrapper = getWrapper("xs")
    })

    it("renders SmallArticleItem", () => {
      expect(wrapper.find("SmallArticleItem").length).toBe(10)
      expect(wrapper.find("LargeArticleItem").length).toBe(0)
    })
  })

  describe("md and up", () => {
    beforeAll(() => {
      wrapper = getWrapper("md")
    })

    it("renders LargeArticleItem", () => {
      expect(wrapper.find("LargeArticleItem").length).toBe(10)
      expect(wrapper.find("SmallArticleItem").length).toBe(0)
    })
  })
})
