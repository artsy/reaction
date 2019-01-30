import { Breakpoint } from "@artsy/palette"
import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkActions.fixture"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { ArtworkActionsFragmentContainer } from "../ArtworkActions"

describe("ArtworkActions", () => {
  const getWrapper = (
    breakpoint: Breakpoint = "lg",
    data = ArtworkActionsFixture
  ) => {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <RelayStubProvider>
          <ArtworkActionsFragmentContainer {...data as any} />
        </RelayStubProvider>
      </MockBoot>
    )
  }

  it("renders proper components for an admin", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Heart").length).toBe(1)
    expect(wrapper.find("Share").length).toBe(1)
    expect(wrapper.find("OpenEye").length).toBe(1)
    expect(wrapper.find("Download").length).toBe(1)
    expect(wrapper.find("Edit").length).toBe(1)
    expect(wrapper.find("Genome").length).toBe(1)
    expect(wrapper.find("More").length).toBe(0)
  })

  it("renders proper components for a non-admin", () => {
    const data = cloneDeep(ArtworkActionsFixture)
    data.user.type = "User"
    const wrapper = getWrapper("lg", data)
    expect(wrapper.find("Heart").length).toBe(1)
    expect(wrapper.find("Share").length).toBe(1)
    expect(wrapper.find("OpenEye").length).toBe(0)
    expect(wrapper.find("Download").length).toBe(1)
    expect(wrapper.find("Edit").length).toBe(0)
    expect(wrapper.find("Genome").length).toBe(0)
    expect(wrapper.find("More").length).toBe(0)
  })

  describe("concerning SaveButton states icon states", () => {
    it("renders heart icon when not sale", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale = null
      const wrapper = getWrapper("lg", data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders heart icon when sale is closed", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_closed = true
      const wrapper = getWrapper("lg", data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Bell").length).toBe(0)
    })

    it("renders bell icon when sale is open", async () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.artwork.sale.is_auction = true
      data.artwork.sale.is_closed = false
      const wrapper = getWrapper("lg", data)
      expect(wrapper.find("Heart").length).toBe(0)
      expect(wrapper.find("Bell").length).toBe(1)
    })
  })

  describe("view in a room", () => {
    it("available for artworks that are hangable", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.user.type = "Admin"
      data.artwork.is_hangable = true
      const wrapper = getWrapper("lg", data)
      expect(wrapper.find("OpenEye").length).toBe(1)
    })

    it("is not available for non hangable artworks", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.user.type = "Admin"
      data.artwork.is_hangable = false
      const wrapper = getWrapper("lg", data)
      expect(wrapper.find("OpenEye").length).toBe(0)
    })
  })

  describe("concerning other utility actions", () => {
    describe("download link", () => {
      it("renders link if is_downloadable", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "User"
        data.artwork.is_downloadable = true
        const wrapper = getWrapper("lg", data)
        expect(wrapper.find("Download").length).toBe(1)
      })

      it("renders link if admin", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "Admin"
        data.artwork.is_downloadable = false
        const wrapper = getWrapper("lg", data)
        expect(wrapper.find("Download").length).toBe(1)
      })

      it("hides link if is_downloadable=false and the user is not an admin", () => {
        const data = cloneDeep(ArtworkActionsFixture)
        data.user.type = "User"
        data.artwork.is_downloadable = false
        const wrapper = getWrapper("lg", data)
        expect(wrapper.find("Download").length).toBe(0)
      })
    })
  })

  describe("in the xs breakpoint", () => {
    it("shows the More icon", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Share").length).toBe(1)
      expect(wrapper.find("OpenEye").length).toBe(1)
      expect(wrapper.find("More").length).toBe(1)
      expect(wrapper.find("Download").length).toBe(0)
      expect(wrapper.find("Edit").length).toBe(0)
      expect(wrapper.find("Genome").length).toBe(0)
    })

    it("clicking the More icon shows the download link if non-admin", () => {
      const wrapper = getWrapper("xs")
      wrapper.find("More").simulate("click")
      expect(wrapper.find("Download").length).toBe(1)
      expect(wrapper.find("Edit").length).toBe(1)
      expect(wrapper.find("Genome").length).toBe(1)
    })

    it("shows no More icon if there are <= 3 actions", () => {
      const data = cloneDeep(ArtworkActionsFixture)
      data.user.type = "User"
      const wrapper = getWrapper("xs", data)
      expect(wrapper.find("Heart").length).toBe(1)
      expect(wrapper.find("Share").length).toBe(1)
      expect(wrapper.find("Download").length).toBe(1)
      expect(wrapper.find("OpenEye").length).toBe(0)
      expect(wrapper.find("Edit").length).toBe(0)
      expect(wrapper.find("Genome").length).toBe(0)
      expect(wrapper.find("More").length).toBe(0)
    })
  })
})
