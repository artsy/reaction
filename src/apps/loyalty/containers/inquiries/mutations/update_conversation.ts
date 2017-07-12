import * as Relay from "react-relay"

export type BuyerOutcome =
  | "PURCHASED"
  | "STILL_CONSIDERING"
  | "HIGH_PRICE"
  | "LOST_INTEREST"
  | "WORK_UNAVAILABLE"
  | "OTHER"

interface MutationProps {
  input: {
    ids: string[]
    buyerOutcome: BuyerOutcome
  }
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
      ids: this.props.input.ids,
      buyer_outcome: this.props.input.buyerOutcome,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateConversationMutationPayload {
        conversations {
          id
        }
      }
    `
  }

  getConfigs() {
    return []
  }
}
