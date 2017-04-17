import * as Relay from "react-relay"

export default class ArtworkQueryConfig extends Relay.Route {
  public static queries = {
    artwork: (component, params) => Relay.QL`
      query {
        artwork(id: $artworkID) {
          ${component.getFragment("artwork", params)}
        }
      }
    `,
  }

  public static paramDefinitions = {
    artworkID: { required: true },
  }

  public static routeName = "ArtworkQueryConfig"
}
