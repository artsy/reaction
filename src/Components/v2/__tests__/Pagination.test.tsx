import { paginationProps } from "Apps/__tests__/Fixtures/Pagination"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import { set } from "lodash/fp"
import React from "react"
import { LargePagination, Pagination, SmallPagination } from "../Pagination"

describe("Pagination", () => {
  const { cursor, callbacks } = paginationProps

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query inMockBoot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
      </MockBoot>
    )
    expect(small.find(SmallPagination).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
      </MockBoot>
    )
    expect(large.find(LargePagination).length).toEqual(1)
  })

  it("disables next button if hasNextPage=false", () => {
    const wrapper = mount(
      <MockBoot>
        <Pagination hasNextPage={false} pageCursors={cursor} {...callbacks} />
      </MockBoot>
    )
    expect(wrapper.find("NextButton").html()).toContain('class="disabled')
  })

  it("disables previous button if pageCursors.previous is falsy", () => {
    const updatedProps = set(
      "cursor.previous",
      undefined,
      paginationProps
    ) as any

    const wrapper = mount(
      <MockBoot>
        <Pagination
          hasNextPage
          pageCursors={updatedProps.cursor}
          {...callbacks}
        />
      </MockBoot>
    )

    expect(wrapper.find("PrevButton").html()).toContain('class="disabled')
  })

  it("triggers next callback on next button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MockBoot>
        <Pagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onNext={spy}
        />
      </MockBoot>
    )
    wrapper.find("NextButton a").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("triggers onClick callback on previous button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MockBoot>
        <Pagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onClick={spy}
        />
      </MockBoot>
    )
    wrapper.find("PrevButton a").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  describe("LargePagination", () => {
    it("triggers on click on number click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <MockBoot>
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onClick={spy}
          />
        </MockBoot>
      )
      wrapper
        .find("Page")
        .first()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })

    it("renders first, last and page range", () => {
      const wrapper = mount(
        <MockBoot>
          <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
        </MockBoot>
      )
      const html = wrapper.html()
      const pages = ["1", "...", "6", "7", "8", "9", "...", "20"]

      pages.forEach(page => {
        expect(html).toContain(`>${page}<`)
      })
    })
  })

  describe("SmallPagination", () => {
    it("does not render pages", () => {
      const wrapper = mount(
        <MockBoot breakpoint="xs">
          <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
        </MockBoot>
      )
      expect(wrapper.find("Page").length).toEqual(0)
      expect(wrapper.find("PageSpan").length).toEqual(0)
    })

    it("triggers next callback on previous button click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <MockBoot breakpoint="xs">
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onClick={spy}
          />
        </MockBoot>
      )
      wrapper
        .find("Pagination__ButtonWithBorder")
        .first()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })

    it("triggers onClick callback on next button click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <MockBoot breakpoint="xs">
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onNext={spy}
          />
        </MockBoot>
      )
      wrapper
        .find("Pagination__ButtonWithBorder")
        .last()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })
  })
})
