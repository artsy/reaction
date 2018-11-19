import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../DevTools"
import { DetailsFragmentContainer } from "../Details"

jest.unmock("react-relay")

describe("Details", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: props => (
        <DetailsFragmentContainer {...props as any} showSaleLine />
      ),
      query: graphql`
        query Details_Test_Query {
          artwork(id: "gerhard-richter-bagdad-ii-flow-p10-1") {
            ...Details_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("in sale", () => {
    it("shows 'bidding closed' message if in closed auction", async () => {
      const data = cloneDeep(artworkInAuction)
      data.sale.is_closed = true
      const wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Bidding closed")
    })

    it("shows sale 'timely' data", async () => {
      const data = cloneDeep(artworkInAuction)
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("ends in 14d")
    })

    it("shows sale 'timely' data when auction is in a preview state", async () => {
      const data = cloneDeep(artworkInAuction)
      data.sale.is_open = false
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("ends in 14d")
    })

    it("shows highest bid if sale open and highest bid", async () => {
      const data = cloneDeep(artworkInAuction)
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
    })

    it("shows opening bid if sale open and no highest bid", async () => {
      const data = cloneDeep(artworkInAuction)
      data.sale_artwork.highest_bid.display = null
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,400")
    })

    it("shows Contact for price if sale_message equals the same", async () => {
      const data = cloneDeep(artworkInAuction)
      data.sale.is_auction = false
      data.sale_message = "Contact For Price"
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("Contact for price")
    })

    it("shows sale message if sale open and no bids", async () => {
      const data = cloneDeep(artworkInAuction)
      data.sale_artwork.highest_bid.display = null
      data.sale_artwork.opening_bid.display = null
      data.sale.is_auction = false
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$450")
    })
  })
})

const artworkInAuction = {
  artists: [
    {
      __id: "QXJ0aXN0OmdlcmhhcmQtcmljaHRlcg==",
      href: "/artist/gerhard-richter",
      name: "Gerhard Richter",
    },
  ],
  href: "/artwork/gerhard-richter-tulips-p17-14",
  date: "2017",
  sale_message: "$450",
  cultural_maker: null,
  title: "Tulips (P17)",
  collecting_institution: null,
  partner: {
    name: "Forum Auctions",
    href: "/auction/forum-auctions",
    __id: "UGFydG5lcjpmb3J1bS1hdWN0aW9ucw==",
  },
  sale: {
    is_auction: true,
    is_live_open: false,
    is_open: true,
    is_closed: false,
    display_timely_at: "ends in 14d",
    __id: "U2FsZTpmb3J1bS1hdWN0aW9ucy1tdWx0aXBseQ==",
  },
  sale_artwork: {
    highest_bid: { display: "$2,600", __id: null },
    opening_bid: { display: "$2,400" },
    __id: "U2FsZUFydHdvcms6Z2VyaGFyZC1yaWNodGVyLXR1bGlwcy1wMTctMTQ=",
  },
  __id: "QXJ0d29yazpnZXJoYXJkLXJpY2h0ZXItdHVsaXBzLXAxNy0xNA==",
}
