import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { TimePeriodFilter } from "../TimePeriodFilter"

describe("TimePeriodFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <TimePeriodFilterFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const TimePeriodFilterFilterTest = () => {
    context = useArtworkFilterContext()
    return <TimePeriodFilter />
  }

  it("updates context on filter change", done => {
    const wrapper = getWrapper()
    wrapper
      .find("Radio")
      .first()
      .find("Flex")
      .first()
      .simulate("click")

    setTimeout(() => {
      expect(context.filters.major_periods).toEqual(["2010"])
      done()
    }, 0)
  })
})
