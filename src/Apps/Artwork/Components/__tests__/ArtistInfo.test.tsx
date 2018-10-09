import { renderRelayTree } from "DevTools/MockRelayRenderer"
import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { ArtistInfoFixture } from "../../../__test__/Fixtures/Artwork/ArtistInfo"
import { ArtistInfoFragmentContainer } from "../ArtistInfo"

jest.unmock("react-relay")

describe("ArtistInfo", () => {
  const getWrapper = async (response = ArtistInfoFixture) => {
    return await renderRelayTree({
      Component: ArtistInfoFragmentContainer,
      query: graphql`
        query ArtistInfo_Test_Query {
          artist(id: "pablo-picasso") {
            ...ArtistInfo_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => response,
      },
    })
  }

  it("renders a correct component tree", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("EntityHeader").length).toBe(1)
    expect(wrapper.find("ArtistBio").length).toBe(1)
    expect(wrapper.find("MarketInsights").length).toBe(1)
    expect(wrapper.find("SelectedExhibitions").length).toBe(1)
  })

  it("hides ArtistBio if no data", async () => {
    const data = cloneDeep(ArtistInfoFixture)
    data.biography_blurb.text = null
    const wrapper = await getWrapper(data)
    expect(wrapper.find("ArtistBio").length).toBe(0)
  })

  it("hides MarketInsights if no data", async () => {
    const data = cloneDeep(ArtistInfoFixture)
    data.highlights.partners = null
    data.collections = null
    data.auctionResults = null
    const wrapper = await getWrapper(data)
    expect(wrapper.find("MarketInsights").html()).toBe(null)
  })

  it("hides SelectedExhibitions if no data", async () => {
    const data = cloneDeep(ArtistInfoFixture)
    data.exhibition_highlights = []
    const wrapper = await getWrapper(data)
    expect(wrapper.find("SelectedExhibitions").html()).toBe(null)
  })
})
