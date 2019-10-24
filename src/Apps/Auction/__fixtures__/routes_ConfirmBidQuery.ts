import { BidForm_saleArtwork } from "__generated__/BidForm_saleArtwork.graphql"
import { LotInfo_artwork } from "__generated__/LotInfo_artwork.graphql"
import { LotInfo_saleArtwork } from "__generated__/LotInfo_saleArtwork.graphql"
import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"

// This complicated type is needed in order to include nested/masked relay queries
export interface ConfirmBidQueryResponse
  extends routes_ConfirmBidQueryResponse {
  artwork: routes_ConfirmBidQueryResponse["artwork"] &
    LotInfo_artwork & {
      saleArtwork: routes_ConfirmBidQueryResponse["artwork"]["saleArtwork"] &
        LotInfo_saleArtwork &
        BidForm_saleArtwork
    }
}

export const ConfirmBidQueryResponseFixture: ConfirmBidQueryResponse = {
  me: {
    id: "my-user-id",
    has_qualified_credit_cards: false,
  },
  artwork: {
    " $fragmentRefs": null as never,
    " $refType": null as never,
    _id: "artworkid",
    id: "artworkslug",
    date: "may 4",
    title: "artworkid",
    imageUrl: "artworkid",
    artistNames: "artworkid",
    saleArtwork: {
      " $fragmentRefs": null as never,
      " $refType": null as never,
      _id: "saleArtworkid",
      id: "saleArtworkslug",
      counts: { bidderPositions: 3 },
      increments: [
        { cents: 5000000, display: "$50,000" },
        { cents: 6000000, display: "$60,000" },
        { cents: 7000000, display: "$70,000" },
      ],
      lotLabel: "13",
      minimumNextBid: {
        amount: "50000",
        cents: 5000000,
        display: "$50,000USD",
      },
      sale: {
        _id: "saleid",
        id: "saleslug",
        name: "Art Sale 2019",
        is_closed: false,
        is_registration_closed: false,
        registrationStatus: {
          id: "bidderid",
          qualified_for_bidding: true,
        },
      },
    },
  },
}
