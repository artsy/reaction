/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { OtherWorks_artwork$ref } from "./OtherWorks_artwork.graphql";
export type OtherWorks_Test_QueryVariables = {};
export type OtherWorks_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": OtherWorks_artwork$ref;
    }) | null;
};
export type OtherWorks_Test_Query = {
    readonly response: OtherWorks_Test_QueryResponse;
    readonly variables: OtherWorks_Test_QueryVariables;
};



/*
query OtherWorks_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...OtherWorks_artwork
    __id
  }
}

fragment OtherWorks_artwork on Artwork {
  id
  _id
  sale {
    is_closed
    __id
  }
  context {
    __typename
    ... on Node {
      __id
    }
    ... on ArtworkContextFair {
      __id
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OtherWorks_Test_Query",
  "id": null,
  "text": "query OtherWorks_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...OtherWorks_artwork\n    __id\n  }\n}\n\nfragment OtherWorks_artwork on Artwork {\n  id\n  _id\n  sale {\n    is_closed\n    __id\n  }\n  context {\n    __typename\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OtherWorks_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "OtherWorks_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OtherWorks_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
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
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_closed",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '45c8fbf80c5d6f8891462afb9d7d2e76';
export default node;
