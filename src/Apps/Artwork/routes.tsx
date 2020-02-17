import loadable from "@loadable/component"
import { request } from "graphql-request"
import { graphql } from "react-relay"
import { getENV } from "Utils/getENV"

export const routes = [
  {
    path: "/artwork/:artworkID/(confirm-bid)?",
    getComponent: () => loadable(() => import("./ArtworkApp")),
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...ArtworkApp_artwork
        }
      }
    `,

    /**
     * Disable artwork page caching for everything but *inquiry works*
     */
    getCacheConfig: async ({ params }) => {
      if (getENV("EXPERIMENTAL_APP_SHELL")) {
        const query = `{
          artwork(id: "${params.artworkID}") {
            is_inquireable
            is_acquireable
            is_offerable
          }
        }`

        const { artwork } = await request(getENV("METAPHYSICS_ENDPOINT"), query)
        const inquiryWork =
          artwork.is_inquireable &&
          !artwork.is_acquireable &&
          !artwork.is_offerable
        const force = inquiryWork ? false : true

        return {
          force,
        }
      } else {
        return {
          force: true,
        }
      }
    },
  },
]
