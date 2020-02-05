import { ArtistHeader_Test_QueryRawResponse } from "__generated__/ArtistHeader_Test_Query.graphql"
import { ArtistHeaderFixture } from "Apps/__tests__/Fixtures/Artist/Components/ArtistHeader"
import {
  ArtistHeaderFragmentContainer as ArtistHeader,
  WorksForSaleButton,
} from "Apps/Artist/Components/ArtistHeader"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  const getWrapper = async (
    response: ArtistHeader_Test_QueryRawResponse["artist"] = ArtistHeaderFixture
  ) => {
    return await renderRelayTree({
      Component: ArtistHeader,
      query: graphql`
        query ArtistHeader_Test_Query @raw_response_type {
          artist(id: "pablo-picasso") {
            ...ArtistHeader_artist
          }
        }
      `,
      mockData: {
        artist: response,
      } as ArtistHeader_Test_QueryRawResponse,
    })
  }

  it("renders correct information about the artist", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("British")
    expect(html).toContain("born 1969")
    expect(html).toContain("9,135 followers")
  })

  it("renders the follow button in the correct state", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain(">Following<")
    expect(html).not.toContain(">Follow<")
  })

  it("renders blue chip indicator when data is present", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Blue Chip")
  })

  it("renders auction record indicator when data is present", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Auction Record")
  })

  it("hides auction record indicator when data is not present", async () => {
    const artist = {
      ...ArtistHeaderFixture,
      auctionResultsConnection: null,
    }
    const wrapper = await getWrapper(artist)
    const html = wrapper.html()
    expect(html).not.toContain("Auction Record")
  })

  it("hides auction record indicator when data is not present", async () => {
    const artist = {
      ...ArtistHeaderFixture,
      highlights: { partnersConnection: null },
    }
    const wrapper = await getWrapper(artist)
    const html = wrapper.html()
    expect(html).not.toContain("Blue Chip")
  })

  it("renders the correct button on the carousel when there are no for sale artworks", async () => {
    const wrapper = await getWrapper()
    expect(
      wrapper
        .find(WorksForSaleButton)
        .at(0)
        .text()
    ).toEqual("Shop works for sale")
  })

  it("renders the correct button on the carousel when there are for sale artworks", async () => {
    const wrapper = await getWrapper({
      ...ArtistHeaderFixture,
      counts: {
        ...ArtistHeaderFixture.counts,
        forSaleArtworks: 21,
      },
    })
    expect(
      wrapper
        .find(WorksForSaleButton)
        .at(0)
        .text()
    ).toEqual("Shop works for sale (21)")
  })
})
