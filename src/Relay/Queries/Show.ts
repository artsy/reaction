import * as Relay from "react-relay"

export default class ShowQueryConfig extends Relay.Route {
  public static queries = {
    show: (component, params) => Relay.QL`
      query {
        show(id: $showID) {
          ${component.getFragment("show", params)}
        }
      }
    `,
  }

  public static paramDefinitions = {
    showID: { required: true },
  }

  public static routeName = "ShowQueryConfig"
}
