import * as Relay from "react-relay"

export class ArtworkQueryConfig extends Relay.Route {
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

export class ArtistQueryConfig extends Relay.Route {
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
