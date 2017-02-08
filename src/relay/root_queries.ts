import * as Relay from "react-relay"

export class ArtworkQueryConfig extends Relay.Route {
  static queries = {
    artwork: (component, params) => Relay.QL`
      query {
        artwork(id: $artworkID) {
          ${component.getFragment("artwork", params)}
        }
      }
    `,
  }

  static paramDefinitions = {
    artworkID: { required: true },
  }

  static routeName = "ArtworkQueryConfig"
}
