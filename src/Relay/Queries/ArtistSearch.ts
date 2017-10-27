import * as Relay from "react-relay/classic"

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
