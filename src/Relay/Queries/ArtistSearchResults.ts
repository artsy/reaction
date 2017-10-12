import * as Relay from "react-relay"

class ArtistSearchQueryConfig extends Relay.Route {
  public static queries = {
    searchResults: (component, params) => Relay.QL`
      query {
        match_artist(term: $term) {
          ${component.getFragment("searchResults")}
        }
      }
    `,
  }
  public static paramDefinitions = {
    term: { required: true },
  }

  public static routeName = "ArtistSearchResultsQuery"
}

export default ArtistSearchQueryConfig
