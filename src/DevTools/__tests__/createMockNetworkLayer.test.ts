import { createMockNetworkLayerTestMutationResultsMutation } from "__generated__/createMockNetworkLayerTestMutationResultsMutation.graphql"
import { createMockFetchQuery } from "DevTools/createMockNetworkLayer"
import { commitMutation, graphql } from "react-relay"
import {
  Environment,
  fetchQuery,
  GraphQLTaggedNode,
  Network,
  OperationBase,
  RecordSource,
  Store,
} from "relay-runtime"
import { createMockNetworkLayer2 } from "../index"
jest.unmock("react-relay")

describe("createMockNetworkLayer", () => {
  function fetchQueryWithResolvers(
    options: Parameters<typeof createMockNetworkLayer2>[0],
    query?: GraphQLTaggedNode
  ) {
    const network = createMockNetworkLayer2(options)

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

  function fetchMutationResults<Input extends OperationBase>({
    mockMutationResults,
    query,
    variables,
    mockNetworkFailure,
  }: {
    mockMutationResults: object
    query: GraphQLTaggedNode
    variables: Input["variables"]
    mockNetworkFailure?: boolean
  }): Promise<any> {
    const mockFetchQuery = mockNetworkFailure
      ? () => Promise.reject(new Error("failed to fetch"))
      : createMockFetchQuery({ mockMutationResults })

    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({
      network: Network.create(mockFetchQuery),
      store,
    })

    return new Promise((resolve, reject) => {
      commitMutation(environment, {
        // tslint:disable-next-line:relay-operation-generics
        mutation: query,
        onCompleted: resolve,
        onError: reject,
        variables,
      })
    })
  }

  describe("preserves the upstream behaviour", () => {
    it("returns the data if present", async () => {
      const data = await fetchQueryWithResolvers({
        mockData: {
          artwork: { title: "Untitled", __id: "untitled" },
        },
      })
      expect(data.artwork.title).toEqual("Untitled")
    })

    it("returns null for nullable fields which are given as null", async () => {
      const data = await fetchQueryWithResolvers({
        mockData: {
          artwork: { title: null, __id: "null" },
        },
      })
      expect(data.artwork.title).toEqual(null)
    })

    it("converts undefined to null", async () => {
      const data = await fetchQueryWithResolvers({
        mockData: {
          artwork: { title: undefined, __id: "null" },
        },
      })
      expect(data.artwork.title).toEqual(null)
    })
  })

  it("complains with a helpful error when selected field is not present", async () => {
    try {
      await fetchQueryWithResolvers({
        mockData: {
          artwork: { __id: "blah" },
        },
      })
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: A mock for field at path 'artwork/title' of type 'String' was expected but not found."`
      )
    }
  })

  // TODO: upgrade graphql. The version we have does hardly any validaton of leaf values.
  it.skip("complains with a helpful error when leaf field type is incorrect", async () => {
    try {
      await fetchQueryWithResolvers({
        mockData: {
          artwork: { __id: "blah", title: 32 },
        },
      })
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot()
    }
  })

  // TODO: related to above, the only check right now is that you can't return an array as a string
  it("complains with a helpful error when leaf field type is incorrect", async () => {
    try {
      await fetchQueryWithResolvers({
        mockData: {
          artwork: { __id: "blah", title: [] },
        },
      })
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: Expected mock value of type 'String' but got 'object' at path 'artwork/title'"`
      )
    }
  })

  it("complains with a helpful error when non-leaf field type is incorrect", async () => {
    try {
      await fetchQueryWithResolvers({
        mockData: {
          artwork: 3,
        },
      })
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: The value at path 'artwork' should be an object but is a number."`
      )
    }
  })

  it("Does not complain when non-leaf nullable field type is null", async () => {
    const data = await fetchQueryWithResolvers({
      mockData: {
        artwork: null,
      },
    })

    expect(data.artwork).toBeNull()
  })

  it("uses data provided with an aliased name", async () => {
    const data = await fetchQueryWithResolvers(
      {
        mockData: {
          artist: {
            forSaleArtworks: [{ __id: "for-sale-work" }],
            notForSaleArtworks: [{ __id: "no-for-sale-work" }],
            __id: "id",
          },
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

  it("uses the alias over the default name if both are present", async () => {
    const data = await fetchQueryWithResolvers(
      {
        mockData: {
          artist: {
            forSaleArtworks: [{ __id: "for-sale-work" }],
            artworks: [{ __id: "no-for-sale-work" }],
            __id: "id",
          },
        },
      },
      graphql`
        query createMockNetworkLayerTestAliasPrecendenceQuery {
          artist(id: "banksy") {
            forSaleArtworks: artworks(filter: IS_FOR_SALE) {
              __id
            }
          }
        }
      `
    )
    expect(data.artist.forSaleArtworks).toEqual([{ __id: "for-sale-work" }])
  })

  describe("mutations", () => {
    const query = graphql`
      mutation createMockNetworkLayerTestMutationResultsMutation(
        $input: buyerAcceptOfferInput!
      ) {
        ecommerceBuyerAcceptOffer(input: $input) {
          orderOrError {
            ... on OrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
            ... on OrderWithMutationSuccess {
              order {
                id
                state
              }
            }
          }
        }
      }
    `

    it("allows mocking successful mutation results", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          ecommerceBuyerAcceptOffer: {
            orderOrError: {
              __typename: "OrderWithMutationSuccess",
              order: {
                __typename: "OfferOrder",
                id: "my-order",
                state: "MOCKED",
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })

      expect(data.ecommerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "MOCKED"
      )
    })

    it("allows not specifying typenames when possible", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          ecommerceBuyerAcceptOffer: {
            orderOrError: {
              order: {
                __typename: "BuyOrder",
                id: "my-order",
                state: "MOCKED",
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })

      expect(data.ecommerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "MOCKED"
      )
    })

    it("complains about ambiguous types", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            ecommerceBuyerAcceptOffer: {
              orderOrError: {
                order: {
                  id: "my-order",
                  state: "MOCKED",
                },
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
        })
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(
          `"RelayMockNetworkLayerError: Ambiguous object at path 'ecommerceBuyerAcceptOffer/orderOrError/order'. Add a __typename from this list: [BuyOrder, OfferOrder]"`
        )
      }
    })

    it("does not complain about unambiguous interface types", async () => {
      const data = await fetchMutationResults<
        createMockNetworkLayerTestMutationResultsMutation
      >({
        mockMutationResults: {
          ecommerceBuyerAcceptOffer: {
            orderOrError: {
              order: {
                id: "my-order",
                state: "MOCKED",
                myLastOffer: {},
              },
            },
          },
        },
        query,
        variables: {
          input: {
            offerId: "offer-id",
          },
        },
      })
      expect(data.ecommerceBuyerAcceptOffer.orderOrError.order.state).toBe(
        "MOCKED"
      )
    })

    it("allows mocking network failures", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            ecommerceBuyerAcceptOffer: {
              orderOrError: {
                __typename: "OrderWithMutationSuccess",
                order: {
                  __typename: "OfferOrder",
                  id: "my-order",
                  state: "MOCKED",
                },
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
          mockNetworkFailure: true,
        })
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`"failed to fetch"`)
      }
    })

    it("complains if you return the wrong type in an abstract position", async () => {
      try {
        await fetchMutationResults<
          createMockNetworkLayerTestMutationResultsMutation
        >({
          mockMutationResults: {
            ecommerceBuyerAcceptOffer: {
              orderOrError: {
                __typename: "OrderWithMutationSuccess",
                order: "hello I am a string",
              },
            },
          },
          query,
          variables: {
            input: {
              offerId: "offer-id",
            },
          },
        })
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(
          `"RelayMockNetworkLayerError: Expected object of type 'Order' but got 'string' at path 'ecommerceBuyerAcceptOffer/orderOrError/order'"`
        )
      }
    })
  })
})
