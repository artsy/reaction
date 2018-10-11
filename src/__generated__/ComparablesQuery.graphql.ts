/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ComparablesQueryVariables = {
    readonly artworkID: string;
};
export type ComparablesQueryResponse = {
    readonly artwork: ({
        readonly artist: ({
            readonly id: string;
        }) | null;
        readonly category: string | null;
        readonly attribution_class: ({
            readonly id: string;
            readonly name: string | null;
        }) | null;
        readonly price: string | null;
    }) | null;
};
export type ComparablesQuery = {
    readonly response: ComparablesQueryResponse;
    readonly variables: ComparablesQueryVariables;
};



/*
query ComparablesQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    artist {
      id
      __id
    }
    category
    attribution_class {
      id
      name
    }
    price
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
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
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
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": null,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          v1,
          v2
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "category",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "attribution_class",
        "storageKey": null,
        "args": null,
        "concreteType": "AttributionClass",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "price",
        "args": null,
        "storageKey": null
      },
      v2
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ComparablesQuery",
  "id": null,
  "text": "query ComparablesQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    artist {\n      id\n      __id\n    }\n    category\n    attribution_class {\n      id\n      name\n    }\n    price\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ComparablesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v3
  },
  "operation": {
    "kind": "Operation",
    "name": "ComparablesQuery",
    "argumentDefinitions": v0,
    "selections": v3
  }
};
})();
(node as any).hash = 'a22876ef628e2f0d38a6d594689aa793';
export default node;
