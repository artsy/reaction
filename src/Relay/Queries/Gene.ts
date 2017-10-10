import * as Relay from "react-relay"

export default class GeneQueryConfig extends Relay.Route {
  public static queries = {
    gene: (component, params) => Relay.QL`
      query {
        gene(id: $geneID) {
          ${component.getFragment("gene", params)}
        }
      }
    `,
  }

  public static paramDefinitions = {
    geneID: { required: true },
  }

  public static routeName = "GeneQueryConfig"
}
