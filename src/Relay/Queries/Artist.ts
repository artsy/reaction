import * as Relay from "react-relay"

export default class ArtistQueryConfig extends Relay.Route {
  public static queries = {
    artist: (component, params) => Relay.QL`
      query {
        artist(id: $artistID) {
          ${component.getFragment("artist", params)}
        }
      }
    `,
  }

  public static paramDefinitions = {
    artistID: { required: true },
  }

  public static routeName = "ArtistQueryConfig"
}
