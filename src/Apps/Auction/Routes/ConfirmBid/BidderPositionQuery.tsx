import {
  BidderPositionQueryResponse,
  BidderPositionQueryVariables,
} from "__generated__/BidderPositionQuery.graphql"
import { graphql } from "react-relay"
import { Environment, fetchQuery } from "relay-runtime"

export const bidderPositionQuery = (
  environment: Environment,
  variables: BidderPositionQueryVariables
) => {
  return fetchQuery<BidderPositionQueryResponse>(
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
    variables
  )
}
