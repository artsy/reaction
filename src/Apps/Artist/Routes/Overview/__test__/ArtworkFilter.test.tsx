// FIXME: Uncomment tests, currently WIP

import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React from "react"
import { graphql } from "react-relay"
import { Provider } from "unstated"
import {
  MockBoot,
  MockRelayRenderer,
  renderUntil,
} from "../../../../../DevTools"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "../Components/ArtworkFilter"

jest.unmock("react-relay")

xdescribe("ArtistHeader", () => {
  // const getWrapper = async (response = ArtworkFilterFixture) => {
  //   return await renderRelayTree({
  //     Component: () => {
  //       return (
  //         <Provider inject={[filterState]}>
  //           <ArtworkFilter />
  //         </Provider>
  //       )
  //     },
  //     query: graphql`
  //       query ArtworkFilter_Test_Query {
  //         artist(id: "pablo-picasso") {
  //           ...ArtworkFilter_artist
  //         }
  //       }
  //     `,
  //     mockResolvers: { Artist: () => {} },
  //   })
  // }
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({} as any)
  })

  it("renders the current mediums", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(ArtworkFilter).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={ArtworkFilter}
            query={graphql`
              query ArtworkFilter_Test_Query {
                artist(id: "andy-warhol") {
                  ...ArtworkFilter_artist
                }
              }
            `}
            mockResolvers={{
              Artist: () => data,
            }}
          />
        </Provider>
      </MockBoot>
    )
    console.log(tree.html())
    // const tree = await getWrapper()
    // console.log(tree.html())
  })
})

const data = {
  id: "cecily-brown",
  __id: "blah",
  name: "Cecily Brown",
  is_followed: false,
  counts: {
    for_sale_artworks: 28,
    ecommerce_artworks: 4,
    auction_artworks: 1,
    artworks: 116,
    follows: 20,
  },
  filtered_artworks: {
    __id: "testest",
    aggregations: [
      {
        slice: "INSTITUTION",
        counts: [
          {
            name: "The FLAG Art Foundation",
            id: "the-flag-art-foundation",
            __id: "QWdncmVnYXRpb25Db3VudDp0aGUtZmxhZy1hcnQtZm91bmRhdGlvbg==",
          },
        ],
      },
      {
        slice: "MEDIUM",
        counts: [
          {
            name: "Painting",
            id: "painting",
            __id: "QWdncmVnYXRpb25Db3VudDpwYWludGluZw==",
          },
        ],
      },
    ],
  },
  grid: {
    __id:
      "RmlsdGVyQXJ0d29ya3M6eyJhY3F1aXJlYWJsZSI6dHJ1ZSwiYWdncmVnYXRpb25zIjpbInRvdGFsIl0sIm1ham9yX3BlcmlvZHMiOltdLCJzaXplIjowLCJzb3J0IjoiLWRlY2F5ZWRfbWVyY2giLCJhcnRpc3RfaWQiOiJjZWNpbHktYnJvd24ifQ==",
    artworks: {
      pageInfo: {
        hasNextPage: false,
        endCursor: "YXJyYXljb25uZWN0aW9uOjM=",
      },
      pageCursors: {
        around: [
          {
            cursor: "YXJyYXljb25uZWN0aW9uOi0x",
            page: 1,
            isCurrent: true,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      edges: [
        {
          node: {
            artists: [
              {
                __id: "QXJ0aXN0OmNlY2lseS1icm93bg==",
                href: "/artist/cecily-brown",
                name: "Cecily Brown",
              },
            ],
            collecting_institution: null,
            cultural_maker: null,
            date: "2009",
            href:
              "/artwork/cecily-brown-cecily-brown-deichtorhallen-hamburg-germany-signed-3",
            id:
              "cecily-brown-cecily-brown-deichtorhallen-hamburg-germany-signed-3",
            image: {
              aspect_ratio: 1,
              placeholder: "100.18382352941177%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/DnTE4ynxczEq8rFHRMWeqQ/large.jpg",
            },
            is_acquireable: true,
            is_biddable: false,
            is_inquireable: true,
            is_saved: false,
            partner: {
              href: "/alpha-137-gallery",
              name: "Alpha 137 Gallery",
              type: "Gallery",
              __id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
            },
            sale: null,
            sale_artwork: null,
            sale_message: "$800",
            title: "Cecily Brown, Deichtorhallen Hamburg, Germany (Signed) ",
            __id:
              "QXJ0d29yazpjZWNpbHktYnJvd24tY2VjaWx5LWJyb3duLWRlaWNodG9yaGFsbGVuLWhhbWJ1cmctZ2VybWFueS1zaWduZWQtMw==",
            _id: "59227f8e7622dd4d747b6993",
          },
        },
      ],
    },
  },
}
