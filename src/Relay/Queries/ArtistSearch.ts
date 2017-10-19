import * as Relay from "react-relay"

export class ArtistSearchQueryConfig extends Relay.Route {
  public static queries = {
    viewer: (component, params) => Relay.QL`
      query {
        viewer {
          ${component.getFragment("viewer", params)}
        }
      }
    `,
  }
  public static paramDefinitions = {
    term: { required: true },
  }

  public static routeName = "ArtistSearchQuery"
}
