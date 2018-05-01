/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TooltipsDataLoaderQueryVariables = {
    readonly artistIds?: ReadonlyArray<string> | null;
};
export type TooltipsDataLoaderQueryResponse = {
    readonly artists: ReadonlyArray<({
            readonly id: string;
            readonly name: string | null;
            readonly href: string | null;
            readonly image: ({
                readonly url: string | null;
            }) | null;
            readonly bio: string | null;
        }) | null> | null;
};



/*
query TooltipsDataLoaderQuery(
  $artistIds: [String!]
) {
  artists(slugs: $artistIds) {
    id
    name
    href
    image {
      url
    }
    bio
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistIds",
    "type": "[String!]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artists",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "slugs",
        "variableName": "artistIds",
        "type": "[String]"
      }
    ],
    "concreteType": "Artist",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "href",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "image",
        "storageKey": null,
        "args": null,
        "concreteType": "Image",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "url",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "bio",
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
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "TooltipsDataLoaderQuery",
  "id": null,
  "text": "query TooltipsDataLoaderQuery(\n  $artistIds: [String!]\n) {\n  artists(slugs: $artistIds) {\n    id\n    name\n    href\n    image {\n      url\n    }\n    bio\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TooltipsDataLoaderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "TooltipsDataLoaderQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '50ce07f44f14b8ccb37a50a96be1cd66';
export default node;
