/* tslint:disable */

import { ConcreteRequest } from "relay-runtime"
export type RelayRouterQueryVariables = {
  readonly artistID: string
}
export type RelayRouterQueryResponse = {
  readonly artist:
    | ({
        readonly name: string | null
        readonly bio: string | null
      })
    | null
}

/*
query RelayRouterQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    name
    bio
    __id
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: "LocalArgument",
        name: "artistID",
        type: "String!",
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: "LinkedField",
        alias: null,
        name: "artist",
        storageKey: null,
        args: [
          {
            kind: "Variable",
            name: "id",
            variableName: "artistID",
            type: "String!",
          },
        ],
        concreteType: "Artist",
        plural: false,
        selections: [
          {
            kind: "ScalarField",
            alias: null,
            name: "name",
            args: null,
            storageKey: null,
          },
          {
            kind: "ScalarField",
            alias: null,
            name: "bio",
            args: null,
            storageKey: null,
          },
          {
            kind: "ScalarField",
            alias: null,
            name: "__id",
            args: null,
            storageKey: null,
          },
        ],
      },
    ]
  return {
    kind: "Request",
    operationKind: "query",
    name: "RelayRouterQuery",
    id: null,
    text:
      "query RelayRouterQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    name\n    bio\n    __id\n  }\n}\n",
    metadata: {},
    fragment: {
      kind: "Fragment",
      name: "RelayRouterQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: v0,
      selections: v1,
    },
    operation: {
      kind: "Operation",
      name: "RelayRouterQuery",
      argumentDefinitions: v0,
      selections: v1,
    },
  }
})()
;(node as any).hash = "8cd7f1f7c6ea15609afc7a87745fbcf3"
export default node
