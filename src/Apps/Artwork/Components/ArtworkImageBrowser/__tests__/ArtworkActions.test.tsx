import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkActions.fixture"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { ArtworkActionsFragmentContainer } from "../ArtworkActions"

describe("ArtworkActions", () => {
  const getWrapper = (props = ArtworkActionsFixture) => {
    return mount(
      <RelayStubProvider>
        <ArtworkActionsFragmentContainer artwork={props.artwork as any} />
      </RelayStubProvider>
    )
  }

  it("renders proper components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Save").length).toBe(1)
    expect(wrapper.find("Share").length).toBe(1)
  })

  describe("concerning SaveButton states icon states", () => {
    it("renders heart icon when not sale", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale = null
      const wrapper = getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders heart icon when sale is closed", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_closed = true
      const wrapper = getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders bell icon when sale is open", async () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_auction = true
      data.artwork.sale.is_closed = false
      const wrapper = getWrapper(data)
      expect(wrapper.find("Heart").length).toBe(0)
      expect(wrapper.find("Bell").length).toBe(1)
    })
  })
})
