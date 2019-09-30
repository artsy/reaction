import { ArtworkDetailsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkDetails"
import { ArtworkDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails"
import { MockBoot, renderRelayTree } from "DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkDetails", () => {
  const getWrapper = async (response = ArtworkDetailsFixture) => {
    return await renderRelayTree({
      Component: ArtworkDetailsFragmentContainer,
      query: graphql`
        query ArtworkDetails_Test_Query {
          artwork(id: "richard-prince-untitled-fashion") {
            ...ArtworkDetails_artwork
          }
        }
      `,
      wrapper: n => <MockBoot breakpoint="xs">{n}</MockBoot>,
      mockData: { artwork: response },
    })
  }
  let wrapper

  describe("ArtworkDetails for a gallery artwork that is missing some fields", () => {
    it("renders additional info with just what is present", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.series = null
      data.publisher = null
      data.manufacturer = null
      data.image_rights = null
      data.framed = null
      wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Signature")
      expect(wrapper.html()).toContain("Condition")
      expect(wrapper.html()).toContain("Certificate of authenticity")
      expect(
        wrapper.find("ArtworkDetailsAdditionalInfo").find("Row").length
      ).toBe(3)
    })
  })

  it("Does not render the additional details section for an artwork who has no metadata", async () => {
    const emptyData = {
      ...ArtworkDetailsFixture,
      series: null,
      publisher: null,
      manufacturer: null,
      image_rights: null,
      framed: null,
      signatureInfo: null,
      conditionDescription: null,
      certificateOfAuthenticity: null,
    }

    const emptyDataWrapper = await getWrapper(emptyData)
    expect(
      emptyDataWrapper.find("ArtworkDetailsAdditionalInfo").find("Row").length
    ).toBe(0)
  })

  describe("ArtworkDetails for gallery artwork with complete details", () => {
    it("renders a correct component tree", async () => {
      wrapper = await getWrapper()
      const html = wrapper.html()
      expect(html).toContain("About the work")
      expect(html).toContain("Following")
      expect(html).toContain("Articles")
      expect(html).toContain("Exhibition history")
      expect(html).toContain("Bibliography")
      expect(html).toContain("Provenance")
    })
  })

  describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
    it("displays partner name", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Salon 94")
    })

    it("displays partner icon when info is available", async () => {
      wrapper = await getWrapper()
      expect(wrapper.find("img").prop("src")).toContain("https://profile_url")
    })

    it("displays partner Initials when profile is present but icon is not", async () => {
      const noIconProfile = cloneDeep(ArtworkDetailsFixture)
      noIconProfile.partner.profile.icon = null
      wrapper = await getWrapper(noIconProfile)
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).toContain("S9")
    })

    it("does not display partner Icon if artwork is from benefit auction", async () => {
      const benefitArtwork = cloneDeep(ArtworkDetailsFixture)
      benefitArtwork.sale = { isBenefit: true, isGalleryAuction: false }
      wrapper = await getWrapper(benefitArtwork)
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).not.toContain("S9")
    })

    it("does not display partner Icon if artwork is from gallery auction", async () => {
      const benefitArtwork = cloneDeep(ArtworkDetailsFixture)
      benefitArtwork.sale = { isBenefit: false, isGalleryAuction: true }
      wrapper = await getWrapper(benefitArtwork)
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).not.toContain("S9")
    })

    it("displays partner additional_information for artwork", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain(
        "<p>Here is some addition info for this work</p>\n"
      )
    })

    it("does not display avatar when profile is not available and no initials for partner", async () => {
      const noIconNoInitials = cloneDeep(ArtworkDetailsFixture)
      noIconNoInitials.partner.profile = null
      noIconNoInitials.partner.initials = null
      wrapper = await getWrapper(noIconNoInitials)
      expect(wrapper.find("img").length).toBe(0)
      // This checks that Avatar div is not rendered.
      expect(wrapper.find("EntityHeader").children.length).toBe(1)
    })

    it("renders truncated list of partner locations", async () => {
      wrapper = await getWrapper()
      expect(wrapper.html()).toContain("New York, Kharkov, +2 more")
    })

    it("renders partner follow button for regular partner with profile", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.partner.type = "NOT Auction House"
      wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Following")
    })

    it("does not render partner follow button if artwork is from an auction partner", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.partner.type = "Auction House"
      wrapper = await getWrapper(data)
      expect(wrapper.html()).not.toContain("Following")
    })

    it("works without a partner", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.partner = null
      wrapper = await getWrapper(data)
      expect(wrapper).toBeTruthy()
    })
  })
})
