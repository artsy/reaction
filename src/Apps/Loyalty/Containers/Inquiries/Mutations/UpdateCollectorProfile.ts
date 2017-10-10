import * as Relay from "react-relay"
import { State } from "../index"

type RelayMutationProps = State

export default class UpdateCollectorProfileMutation extends Relay.Mutation<RelayMutationProps, any> {
  getMutation() {
    return Relay.QL`mutation {
      updateCollectorProfile
    }`
  }

  getVariables() {
    return {
      self_reported_purchases: this.props.self_reported_purchases,
      loyalty_applicant: this.props.loyalty_applicant,
    }
  }

  getFatQuery() {
    return Relay.QL`
    fragment on UpdateCollectorProfilePayload {
      loyalty_applicant_at
    }`
  }

  getConfigs() {
    return [
      {
        type: "REQUIRED_CHILDREN",
        children: [
          Relay.QL`
        fragment on UpdateCollectorProfilePayload {
          loyalty_applicant_at
        }`,
        ],
      },
    ]
  }
}
