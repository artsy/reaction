import { IResolvers } from "graphql-tools/dist/Interfaces"
import { graphql } from "react-relay"
import {
  Environment,
  fetchQuery,
  GraphQLTaggedNode,
  RecordSource,
  Store,
} from "relay-runtime"
import { createMockNetworkLayer } from "../index"

describe("createMockNetworkLayer", () => {
  function fetchQueryWithResolvers(
    resolvers: IResolvers,
    query?: GraphQLTaggedNode
  ) {
    const network = createMockNetworkLayer(resolvers)

    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return fetchQuery(
      environment,
      query ||
        graphql`
          query createMockNetworkLayerTestQuery {
            artwork(id: "untitled") {
              __id
              title
            }
          }
        `,
      {}
    )
  }

  describe("preserves the upstream behaviour", () => {
    it("returns the data if present", async () => {
      const data = await fetchQueryWithResolvers({
        Query: { artwork: () => ({ title: "Untitled", __id: "untitled" }) },
      })
      expect(data.artwork.title).toEqual("Untitled")
    })

    it("returns null for nullable fields which are given as null", async () => {
      const data = await fetchQueryWithResolvers({
        Query: { artwork: () => ({ title: null, __id: "null" }) },
      })
      expect(data.artwork.title).toEqual(null)
    })

    // // TODO: figure out what graphql-js does with `undefined`
    // it("errors for nullable fields which are given as undefined", async () => {
    //   const network = createMockNetworkLayer({
    //     Query: () => ({ artwork: () => ({ title: undefined }) }),
    //   })
    //   const source = new RecordSource()
    //   const store = new Store(source)
    //   const environment = new Environment({ network, store })

    //   const query = graphql`
    //     query createMockNetworkLayerQuery($artworkID: String!) {
    //       artwork(id: $artworkID) {
    //         title
    //       }
    //     }
    //   `

    //   const variables = {
    //     artworkID: "110798995619330",
    //   }

    //   await fetchQuery(environment, query, variables).then(data => {
    //     console.log(data)
    //     console.log(data)
    //     console.log(data)
    //     throw new Error("this should not happen")
    //   }).catch(e => {
    //     expect(e.message).toMatch("hello")
    //   })
    // })

    // it("calls the default fieldresolver if undefined", () => {})
  })

  it("complains with a helpful error when selected field is not present", async () => {
    try {
      await fetchQueryWithResolvers({
        Query: { artwork: () => ({ __id: "blah" }) },
      })
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: A mock for field at path 'artwork/title' of type 'String' was expected but not found."`
      )
    }
  })

  it("uses data provided with an aliased name", async () => {
    const data = await fetchQueryWithResolvers(
      {
        Query: {
          artist: () => ({
            forSaleArtworks: [{ __id: "for-sale-work" }],
            notForSaleArtworks: [{ __id: "no-for-sale-work" }],
            __id: "id",
          }),
        },
      },
      graphql`
        query createMockNetworkLayerTestAliasQuery {
          artist(id: "banksy") {
            forSaleArtworks: artworks(filter: IS_FOR_SALE) {
              __id
            }
            notForSaleArtworks: artworks(filter: IS_NOT_FOR_SALE) {
              __id
            }
          }
        }
      `
    )
    expect(data.artist.forSaleArtworks).toEqual([{ __id: "for-sale-work" }])
    expect(data.artist.notForSaleArtworks).toEqual([
      { __id: "no-for-sale-work" },
    ])
  })
})
