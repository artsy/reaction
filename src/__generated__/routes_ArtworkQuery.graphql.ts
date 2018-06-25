/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_ArtworkQueryVariables = {
    readonly artworkID: string;
};
export type routes_ArtworkQueryResponse = {
    readonly viewer: ({}) | null;
};



/*
query routes_ArtworkQuery(
  $artworkID: String!
) {
  viewer {
    ...ArtworkApp_viewer
  }
}

fragment ArtworkApp_viewer on Viewer {
  artwork(id: $artworkID) {
    description
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ArtworkQuery",
  "id": null,
  "text": "query routes_ArtworkQuery(\n  $artworkID: String!\n) {\n  viewer {\n    ...ArtworkApp_viewer\n  }\n}\n\nfragment ArtworkApp_viewer on Viewer {\n  artwork(id: $artworkID) {\n    description\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtworkQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkApp_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtworkQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artwork",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "artworkID",
                "type": "String!"
              }
            ],
            "concreteType": "Artwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "description",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = '5035a727fb0c841b90a0da6f6f8e52af';
export default node;
