import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { MediumFilter } from "../MediumFilter"

describe("MediumFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <MediumFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const MediumFilterTest = () => {
    context = useArtworkFilterContext()
    return <MediumFilter />
  }

  it("selects mediums", done => {
    const wrapper = getWrapper()
    wrapper
      .find("Radio")
      .first()
      .find("Flex")
      .first()
      .simulate("click")

    setTimeout(() => {
      expect(context.filters.medium).toEqual("painting")
      done()
    }, 0)
  })
})
