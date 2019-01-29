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
        <ArtworkActionsFragmentContainer {...props as any} />
      </RelayStubProvider>
    )
  }

  it.only("renders proper components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Heart").length).toBe(1)
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

  describe("view in a room", () => {
    it("available for artworks that are hangable", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.user.type = "Admin"
      data.artwork.is_hangable = true
      const wrapper = getWrapper(data)
      expect(wrapper.find("OpenEye").length).toBe(1)
    })

    it("is not available for non hangable artworks", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.user.type = "Admin"
      data.artwork.is_hangable = false
      const wrapper = getWrapper(data)
      expect(wrapper.find("OpenEye").length).toBe(0)
    })
  })

  describe("concerning other utility actions", () => {
    describe("download link", () => {
      it("renders link if is_downloadable", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.artwork.is_downloadable = true
        const wrapper = getWrapper(data)
        expect(wrapper.find("Download").length).toBe(1)
      })

      it("renders link if admin", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "Admin"
        const wrapper = getWrapper(data)
        expect(wrapper.find("Download").length).toBe(1)
      })

      it("hides link if is_downloadable=false", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "not admin"
        data.artwork.is_downloadable = false
        const wrapper = getWrapper(data)
        expect(wrapper.find("Download").length).toBe(0)
      })
    })

    describe("admin actions", () => {
      it("renders genome and edit if admin", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "Admin"
        const wrapper = getWrapper(data)
        expect(wrapper.find("Edit").length).toBe(1)
        expect(wrapper.find("Genome").length).toBe(1)
      })
    })
  })
})
