import * as Relay from "react-relay"

export default class FairQueryConfig extends Relay.Route {
  public static queries = {
    fair: (component, params) => Relay.QL`
      query {
        fair(id: $fairID) {
          ${component.getFragment("fair", params)}
        }
      }
    `,
  }

  public static paramDefinitions = {
    fairID: { required: true },
  }

  public static routeName = "FairQueryConfig"
}
