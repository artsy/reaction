import {
  BidderPositionQueryResponse,
  BidderPositionQueryVariables,
} from "__generated__/BidderPositionQuery.graphql"
import { graphql, GraphQLTaggedNode } from "react-relay"
import { CacheConfig, Environment, fetchQuery, Variables } from "relay-runtime"

// @types/relay-runtime 1.3.5 does not have the correct signature so making our
// own for now. Remove once we upgrade to the latest version.
const fetchRelayModernQuery: <T = any>(
  environment: any,
  taggedNode: GraphQLTaggedNode,
  variables: Variables,
  cacheConfig?: CacheConfig
) => Promise<T> = fetchQuery

export const bidderPositionQuery = (
  environment: Environment,
  variables: BidderPositionQueryVariables
) => {
  return fetchRelayModernQuery<BidderPositionQueryResponse>(
    environment,
    graphql`
      query BidderPositionQuery($bidderPositionID: String!) {
        me {
          bidderPosition: bidder_position(id: $bidderPositionID) {
            status
            messageHeader: message_header
            position {
              id
              suggestedNextBid: suggested_next_bid {
                cents
                display
              }
            }
          }
        }
      }
    `,
    variables,
    {
      force: true,
    }
  )
}
