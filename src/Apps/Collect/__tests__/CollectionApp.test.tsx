import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"

import { Provider } from "unstated"
import { MockBoot, MockRelayRenderer, renderUntil } from "../../../DevTools"
import { CollectionAppFragmentContainer as CollectionApp } from "../CollectionApp"
import { FilterContainer } from "../Components/Filters"
import { FilterState } from "../FilterState"

jest.unmock("react-relay")

describe("CollectionApp", () => {
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })
  })

  it("renders a relay tree correctly", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(FilterContainer).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={CollectionApp}
            query={graphql`
              query CollectionAppTestQuery {
                collection: marketingCollection(slug: "kaws-companions") {
                  ...CollectionApp_collection
                }
              }
            `}
            mockResolvers={{
              MarketingCollection: () => data.collection,
              ArtworkConnection: () =>
                data.collection.filtered_artworks.artworks,
              FormattedNumber: () => 3,
            }}
          />
        </Provider>
      </MockBoot>
    )

    const items = tree.find("GridItem__ArtworkGridItem")
    expect(items.length).toEqual(3)
    expect(items.at(0).text()).toContain("Pinocchio, 2018")
    expect(items.at(1).text()).toContain("KAWS x Undercover , 1999")
  })
})

// tslint:disable-next-line:one-variable-per-declaration
const data = {
  collection: {
    id: "5bc89e25ec650e14cf0b4061",
    slug: "kaws-companions",
    title: "KAWS: Companions",
    description:
      "<p>Brian Donnelly, better known as KAWS, spent the first year of his career as an animator for Disney. After leaving in 1997, KAWS took inspiration from the company&rsquo;s signature cartoon, Mickey Mouse, to create his own set of characters that he named &ldquo;Companions.&rdquo; With gloved hands and X&rsquo;s for eyes, &ldquo;Companions&rdquo; first appeared in KAWS&rsquo;s graffiti works across New York City in the late 1990s. By the end of the decade, the street artist created his first three-dimensional version, and his characters have since taken on a variety of colors, sizes, and poses. In 2017, his four-foot-tall Seated Companion (2011) broke the auction record for the series, selling for over $400,000. However, many of KAWS&rsquo;s &ldquo;Companions&rdquo; are considerably more affordable, such as his vinyl toys produced in collaboration with esteemed manufacturers including Bounty Hunter, Bape, Medicom, and his own brand OriginalFake, which was active between 2006 and 2013.</pheaderI",
    headerImage:
      "https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png",
    category: "Collectible Sculptures",
    credit: "<p>&copy; KAWS, Medicom Toy 2007.</p>",
    query: { artist_ids: [], artist_id: null, gene_id: null, __id: null },
    artworks: {
      aggregations: [],
      __id: "123",
    },
    filtered_artworks: {
      __id:
        "RmlsdGVyQXJ0d29ya3M6eyJhZ2dyZWdhdGlvbnMiOlsidG90YWwiXSwiYXJ0aXN0X2lkcyI6W10sImdlbmVfaWRzIjpbXSwic2l6ZSI6MCwic29ydCI6Ii1wYXJ0bmVyX3VwZGF0ZWRfYXQiLCJ0YWdfaWQiOiJjb21wYW5pb24ifQ==",
      artworks: {
        pageInfo: {
          hasNextPage: true,
          endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
        },
        pageCursors: {
          around: [
            { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
          ],
          first: null,
          last: null,
          previous: null,
        },
        edges: [
          {
            node: {
              __id: "QXJ0d29yazprYXdzLXBpbm9jY2hpby0z",
              image: {
                aspect_ratio: 0.67,
                placeholder: "150%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/qu24dwWrXHfw5Z3e6KhXPQ/large.jpg",
              },
              is_biddable: false,
              is_acquireable: false,
              href: "/artwork/kaws-pinocchio-3",
              title: "Pinocchio",
              date: "2018",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0Omthd3M=",
                  href: "/artist/kaws",
                  name: "KAWS",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "IDEA",
                href: "/idea",
                __id: "UGFydG5lcjppZGVhLTE=",
                type: "Gallery",
              },
              sale: null,
              sale_artwork: null,
              _id: "5b33f5fa139b2110e3393f17",
              is_inquireable: true,
              id: "kaws-pinocchio-3",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTU=",
              image: {
                aspect_ratio: 0.71,
                placeholder: "141.82142857142856%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/oQDgNpsXPr14ZN1Bh_-03A/large.jpg",
              },
              is_biddable: false,
              is_acquireable: true,
              href: "/artwork/kaws-kaws-x-undercover-5",
              title: "KAWS x Undercover ",
              date: "1999",
              sale_message: "$2,500",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0Omthd3M=",
                  href: "/artist/kaws",
                  name: "KAWS",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Alpha 137 Gallery",
                href: "/alpha-137-gallery",
                __id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
                type: "Gallery",
              },
              sale: null,
              sale_artwork: null,
              _id: "5b7296385bca99428e22c3ff",
              is_inquireable: true,
              id: "kaws-kaws-x-undercover-5",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTQ=",
              image: {
                aspect_ratio: 0.71,
                placeholder: "141.42857142857144%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/uW1NTw1GoTtuViaEFwxX-A/large.jpg",
              },
              is_biddable: false,
              is_acquireable: true,
              href: "/artwork/kaws-kaws-x-undercover-4",
              title: "KAWS x Undercover ",
              date: "1999",
              sale_message: "$2,500",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0Omthd3M=",
                  href: "/artist/kaws",
                  name: "KAWS",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Alpha 137 Gallery",
                href: "/alpha-137-gallery",
                __id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
                type: "Gallery",
              },
              sale: null,
              sale_artwork: null,
              _id: "5b729753a0916842e6238818",
              is_inquireable: true,
              id: "kaws-kaws-x-undercover-4",
              is_saved: false,
            },
          },
        ],
      },
    },
    __id: "5bc89e25ec650e14cf0b4061",
  },
}
