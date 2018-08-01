import { mount } from "enzyme"
import { set } from "lodash/fp"
import React from "react"
import { paginationProps } from "../../../Apps/__test__/Fixtures/Pagination"
import { Boot } from "../../../Router/Boot"
import { LargePagination, Pagination, SmallPagination } from "../Pagination"

describe("Pagination", () => {
  let { cursor, callbacks } = paginationProps

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
      </Boot>
    )
    expect(small.find(SmallPagination).length).toEqual(1)

    const large = mount(
      <Boot initialMatchingMediaQueries={["lg"]}>
        <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
      </Boot>
    )
    expect(large.find(LargePagination).length).toEqual(1)
  })

  it("disables next button if hasNextPage=false", () => {
    const wrapper = mount(
      <Boot>
        <Pagination hasNextPage={false} pageCursors={cursor} {...callbacks} />
      </Boot>
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
      <Boot>
        <Pagination
          hasNextPage
          pageCursors={updatedProps.cursor}
          {...callbacks}
        />
      </Boot>
    )

    expect(wrapper.find("PrevButton").html()).toContain('class="disabled')
  })

  it("triggers next callback on next button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Boot>
        <Pagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onNext={spy}
        />
      </Boot>
    )
    wrapper.find("NextButton a").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("triggers onClick callback on previous button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Boot>
        <Pagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onClick={spy}
        />
      </Boot>
    )
    wrapper.find("PrevButton a").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  describe("LargePagination", () => {
    it("triggers on click on number click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Boot>
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onClick={spy}
          />
        </Boot>
      )
      wrapper
        .find("Page")
        .first()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })

    it("renders first, last and page range", () => {
      const wrapper = mount(
        <Boot>
          <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
        </Boot>
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
        <Boot initialMatchingMediaQueries={["xs"]}>
          <Pagination hasNextPage pageCursors={cursor} {...callbacks} />
        </Boot>
      )
      expect(wrapper.find("Page").length).toEqual(0)
      expect(wrapper.find("PageSpan").length).toEqual(0)
    })

    it("triggers next callback on previous button click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Boot initialMatchingMediaQueries={["xs"]}>
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onClick={spy}
          />
        </Boot>
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
        <Boot initialMatchingMediaQueries={["xs"]}>
          <Pagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onNext={spy}
          />
        </Boot>
      )
      wrapper
        .find("Pagination__ButtonWithBorder")
        .last()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })
  })
})
