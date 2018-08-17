import { mount } from "enzyme"
import React from "react"
import { Boot } from "Router"
import { Footer, LargeFooter, SmallFooter } from "../Footer"

describe("Footer", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <Footer />
      </Boot>
    )
    expect(small.find(SmallFooter).length).toEqual(1)

    const large = mount(
      <Boot initialMatchingMediaQueries={["lg"]}>
        <Footer />
      </Boot>
    )
    expect(large.find(LargeFooter).length).toEqual(1)
  })
})
