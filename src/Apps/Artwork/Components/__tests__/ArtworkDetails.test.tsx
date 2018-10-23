import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { ArtworkDetailsFixture } from "../../../__test__/Fixtures/Artwork/ArtworkDetails"
import { ArtworkDetailsFragmentContainer } from "../ArtworkDetails/index"

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
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  it("renders a correct component tree for artwork with all details", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("About the work")
    // One for Artsy details and one for partner details
    expect(wrapper.find("ReadMore").length).toBe(2)
    expect(html).toContain("Following")
    expect(html).toContain("Articles")
    expect(html).toContain("Exhibition history")
    expect(html).toContain("Bibliography")
  })

  describe("ArtworkDetailsAboutTheWorkFromPartner", () => {
    it("displays partner name", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Salon 94")
    })

    it("displays partner icon when info is available", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("img").prop("src")).toContain("https://profile_url")
    })

    it("displays partner Initials when profile is present but icon is not", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.partner.profile.icon = null
      const wrapper = await getWrapper(data)
      expect(wrapper.find("img").length).toBe(0)
      expect(wrapper.html()).toContain("S9")
    })

    it("displays partner additional_information for artwork", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain(
        "<p>Here is some addition info for this work</p>\n"
      )
    })

    it("does not display avatar when profile is not available and no initials for partner", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.partner.profile = null
      data.partner.initials = null
      const wrapper = await getWrapper(data)
      expect(wrapper.find("img").length).toBe(0)
      // This checks that Avatar div is not rendered.
      expect(wrapper.find("EntityHeader").children.length).toBe(1)
    })

    it("renders truncated list of partner locations", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("New York, Kharkov, +2 more")
    })

    it("renders partner follow button for regular partner with profile", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Following")
    })

    it("does not render partner follow button if artwork is in an auction", async () => {
      const data = cloneDeep(ArtworkDetailsFixture)
      data.is_in_auction = true
      const wrapper = await getWrapper(data)
      expect(wrapper.html()).not.toContain("Following")
    })
  })
})
