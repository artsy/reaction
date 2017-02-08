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

export class ArtistQueryConfig extends Relay.Route {
  static queries = {
    artist: (component, params) => Relay.QL`
      query {
        artist(id: $artistID) {
          ${component.getFragment("artist", params)}
        }
      }
    `,
  }

  static paramDefinitions = {
    artistID: { required: true },
  }

  static routeName = "ArtistQueryConfig"
}
