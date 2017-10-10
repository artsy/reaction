import * as Relay from "react-relay"

export default class FilterArtworksQueryConfig extends Relay.Route {
  public static queries = {
    filter_artworks: (component, params) => Relay.QL`
      query {
        viewer {
          ${component.getFragment("filter_artworks", { ...params })},
        }
      }
    `,
  }

  public static routeName = "FilterArtworksQueryConfig"
}
