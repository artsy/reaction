import { Details_artwork } from "__generated__/Details_artwork.graphql"
import { renderRelayTree } from "DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"
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
      const data = cloneDeep(mutableArtwork)
      data.sale.is_closed = true
      const wrapper = await getWrapper(data)
      expect(wrapper.html()).toContain("Bidding closed")
    })

    it("shows highest bid if sale open and highest bid", async () => {
      const data = cloneDeep(mutableArtwork)
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
    })

    it("shows opening bid if sale open and no highest bid", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale_artwork.highest_bid.display = null
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,400")
    })

    it("shows Contact for price if sale_message equals the same", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale.is_auction = false
      data.sale_message = "Contact For Price"
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("Contact for price")
    })

    it("shows sale message if sale open and no bids", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale_artwork.highest_bid.display = null
      data.sale_artwork.opening_bid.display = null
      data.sale.is_auction = false
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$450")
    })

    it("shows the number of bids in the message if sale open and are bids", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale_artwork.counts.bidder_positions = 2
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).toContain("$2,600")
      expect(html).toContain("(2 bids)")
    })

    it("skips bid information in a closed show", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale_artwork.counts.bidder_positions = 2
      data.sale.is_closed = true
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).not.toContain("(2 bids)")
    })

    it("skips showing bid information when there are no bidder positions", async () => {
      const data = cloneDeep(mutableArtwork)
      data.sale_artwork.counts.bidder_positions = 0
      const wrapper = await getWrapper(data)
      const html = wrapper.html()
      expect(html).not.toContain("bid")
    })
  })
})

const artworkInAuction: Partial<Details_artwork> = {
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
  },
  sale: {
    is_auction: true,
    is_closed: false,
  },
  sale_artwork: {
    highest_bid: { display: "$2,600" },
    opening_bid: { display: "$2,400" },
    counts: { bidder_positions: 0 },
  },
}

// So, we make changes to the fixtured data in tests
// you'll need to use a version that's Any'd so that
// tsc passes. Trade-off of any in the test vs guarantee
// of the data in the fixture.
//
// Maybe we could use something like a
// Muatable<Partial<Details_artwork>>
// instead?
const mutableArtwork = artworkInAuction as any
