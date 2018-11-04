// import { mount } from "enzyme"
// import createRender from "found/lib/createRender"
// import getFarceResult from "found/lib/server/getFarceResult"
import { find } from "lodash"
import React from "react"
import { Environment, RecordSource, Store } from "relay-runtime"
import { Boot } from "../../../Artsy/Router/Components/Boot"
import { createMockNetworkLayer, renderUntil } from "../../../DevTools"
import { routes } from "../routes"

describe("Routes", () => {
  async function render(url, mockResolvers) {
    const network = createMockNetworkLayer(mockResolvers)
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    // return await getFarceResult({
    //   url,
    //   routeConfig: routes,
    //   resolver: new Resolver(environment),
    //   render: createRender({}),
    // })

    return (
      <Boot
        context={{}}
        user={{}}
        relayEnvironment={environment}
        routes={routes}
      />
    )
  }

  describe("#/collect/:medium?", () => {
    let route = null
    const params = {}

    beforeEach(() => {
      route = find(routes, ["path", "/collect/:medium?"])
    })

    it("sends correct default variables for query", () => {
      expect(route.prepareVariables(params, {})).toEqual({
        sort: "-decayed_merch",
      })
    })

    it("respects the sort option selected by the user", () => {
      const props = {
        location: {
          query: {
            sort: "-published_at",
          },
        },
      }

      expect(route.prepareVariables(params, props)).toEqual({
        sort: "-published_at",
      })
    })

    xit("renders", async () => {
      const { element } = (await render("/collect", {
        Viewer: () => data,
      })) as any

      renderUntil(wrapper => {
        console.log(wrapper.debug())
        return false
      }, element)
    })
  })
})

const data = {
  filtered_artworks: {
    __id: "123",
    artworks: {
      pageInfo: {
        hasNextPage: true,
        endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
      },
      pageCursors: {
        around: [
          { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
          { cursor: "YXJyYXljb25uZWN0aW9uOjI5", page: 2, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjU5", page: 3, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjg5", page: 4, isCurrent: false },
        ],
        first: null,
        last: {
          cursor: "YXJyYXljb25uZWN0aW9uOjQ5MDk0OQ==",
          page: 1,
          isCurrent: false,
        },
        previous: null,
      },
      edges: [
        {
          node: {
            __id: "QXJ0d29yazplZC1ydXNjaGEtc3BvbmdlLXB1ZGRsZQ==",
            image: {
              aspect_ratio: 0.96,
              placeholder: "104.16666666666667%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/eBFXu9vJQK4HmvJAelijZA/large.jpg",
            },
            is_biddable: false,
            is_acquireable: false,
            href: "/artwork/ed-ruscha-sponge-puddle",
            title: "Sponge Puddle",
            date: "2015",
            sale_message: "$40,000 - 50,000",
            cultural_maker: null,
            artists: [
              {
                __id: "QXJ0aXN0OmVkLXJ1c2NoYQ==",
                href: "/artist/ed-ruscha",
                name: "Ed Ruscha",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Richard Levy Gallery",
              href: "/richard-levy-gallery",
              __id: "UGFydG5lcjpyaWNoYXJkLWxldnktZ2FsbGVyeQ==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            _id: "5706a842b202a31584000171",
            is_inquireable: true,
            id: "ed-ruscha-sponge-puddle",
            is_saved: false,
          },
        },
        {
          node: {
            __id: "QXJ0d29yazpsaXNhLWJyZXNsb3ctcGluay1yZWQtYW5kLXB1cnBsZQ==",
            image: {
              aspect_ratio: 0.99,
              placeholder: "100.54000981836033%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/SpegNal7HtbFsgnUORDvNg/large.jpg",
            },
            is_biddable: false,
            is_acquireable: false,
            href: "/artwork/lisa-breslow-pink-red-and-purple",
            title: "Pink, Red, and Purple",
            date: "2014",
            sale_message: "Sold",
            cultural_maker: null,
            artists: [
              {
                __id: "QXJ0aXN0Omxpc2EtYnJlc2xvdw==",
                href: "/artist/lisa-breslow",
                name: "Lisa Breslow",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Kathryn Markel Fine Arts",
              href: "/kathryn-markel-fine-arts",
              __id: "UGFydG5lcjprYXRocnluLW1hcmtlbC1maW5lLWFydHM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            _id: "541481987261692d61ba0200",
            is_inquireable: true,
            id: "lisa-breslow-pink-red-and-purple",
            is_saved: false,
          },
        },
      ],
    },
  },
}
