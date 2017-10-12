import * as Relay from "react-relay"

class ArtistSearchQueryConfig extends Relay.Route {
  public static queries = {
    popular_artists: (component, params) => Relay.QL`
      query {
        match_artist(term: "damien") {
          ${component.getFragment("popular_artists", params)}
        }
      }
    `,
  }

  public static routeName = "PopularQueryConfig"
}

export default ArtistSearchQueryConfig
