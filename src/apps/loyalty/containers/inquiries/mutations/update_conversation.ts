import * as Relay from "react-relay"

export type BuyerOutcome =
  "purchased" |
  "still_considering" |
  "high_price" |
  "lost_interest" |
  "work_unavailable" |
  "other"

interface MutationProps {
  conversationIds: string[]
  buyerOutcome: BuyerOutcome
}

export default class UpdateConversationMutation extends Relay.Mutation<MutationProps, any> {
  getMutation() {
    return Relay.QL`
      mutation {
        updateConversation
      }
    `
  }

  getVariables() {
    return {
      ids: this.props.conversationIds,
      buyer_outcome: this.props.buyerOutcome,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateConversationPayload {

      }
    `
  }

  getConfigs() {
    return []
  }
}
