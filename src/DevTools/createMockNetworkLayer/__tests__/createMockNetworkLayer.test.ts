import { graphql } from "react-relay"
import { Environment, fetchQuery, RecordSource, Store } from "relay-runtime"
import { createMockNetworkLayer } from "../index"

describe("createMockNetworkLayer", () => {
  describe("preserves the upstream behaviour", () => {
    it("returns the data if present", async () => {
      const network = createMockNetworkLayer({
        Query: { artwork: () => ({ title: "lol", __id: "blah" }) },
      })
      const source = new RecordSource()
      const store = new Store(source)
      const environment = new Environment({ network, store })

      const query = graphql`
        query createMockNetworkLayerQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            title
          }
        }
      `

      const variables = {
        artworkID: "110798995619330",
      }

      await fetchQuery(environment, query, variables).then(data => {
        expect(data.artwork.title).toEqual("lol")
      })
    })

    it("returns null for nullable fields which are given as null", async () => {
      const network = createMockNetworkLayer({
        Query: { artwork: () => ({ title: null, __id: "id" }) },
      })
      const source = new RecordSource()
      const store = new Store(source)
      const environment = new Environment({ network, store })

      const query = graphql`
        query createMockNetworkLayerQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            title
          }
        }
      `

      const variables = {
        artworkID: "110798995619330",
      }

      await fetchQuery(environment, query, variables).then(data => {
        expect(data.artwork.title).toEqual(null)
      })
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

  it("Complains with a helpful error when selected field is not present", async () => {
    const network = createMockNetworkLayer({
      Query: { artwork: () => ({ __id: "blah" }) },
    })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    const query = graphql`
      query createMockNetworkLayerQuery($artworkID: String!) {
        artwork(id: $artworkID) {
          title
        }
      }
    `

    const variables = {
      artworkID: "110798995619330",
    }

    try {
      await fetchQuery(environment, query, variables)
    } catch (e) {
      expect(e.message).toMatchInlineSnapshot(
        `"RelayMockNetworkLayerError: A mock for field at path 'artwork/title' of type 'String' was expected but not found."`
      )
    }
  })
})
