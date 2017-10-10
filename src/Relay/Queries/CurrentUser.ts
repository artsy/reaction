import * as Relay from "react-relay"

export default class CurrentUserRoute extends Relay.Route {
  public static queries = {
    user: (container, params) => Relay.QL`
      query {
        me {
          ${container.getFragment("user")}
        }
      }
    `,
  }

  public static routeName = "CurrentUserRoute"
}
