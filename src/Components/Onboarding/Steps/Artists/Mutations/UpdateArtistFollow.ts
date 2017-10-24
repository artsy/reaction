import * as Relay from "react-relay"
import { State } from "../ItemLink"

type RelayMutationProps = State

export default class UpdateArtistFollowMutation extends Relay.Mutation<RelayMutationProps, any> {
  getMutation() {
    return Relay.QL`mutation {
      followArtist
    }`
  }

  getVariables() {
    return {
      artist_id: this.props.artist_id,
    }
  }

  getFatQuery() {
    return Relay.QL`
    fragment on Artist {
      is_followed,
      counts {
        follows
      }
    }`
  }

  getConfigs() {
    return []
  }
}
