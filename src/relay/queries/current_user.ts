import * as Relay from "react-relay"

export default class CurrentUserRoute extends Relay.Route {
  public static queries = {
    user: (component, params) => Relay.QL`
      query {
        me {
          ${(component.getFragment("user"))}
        }
      }
    `,
  }

  public static routeName = "CurrentUserRoute"
}
