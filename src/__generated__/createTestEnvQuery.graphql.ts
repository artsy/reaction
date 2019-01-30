/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { createTestEnv_artwork$ref } from "./createTestEnv_artwork.graphql";
export type createTestEnvQueryVariables = {};
export type createTestEnvQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": createTestEnv_artwork$ref;
    }) | null;
};
export type createTestEnvQuery = {
    readonly response: createTestEnvQueryResponse;
    readonly variables: createTestEnvQueryVariables;
};



/*
query createTestEnvQuery {
  artwork(id: "unused") {
    ...createTestEnv_artwork
    __id
  }
}

fragment createTestEnv_artwork on Artwork {
  title
  artist {
    name
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused",
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
  "name": "createTestEnvQuery",
  "id": null,
  "text": "query createTestEnvQuery {\n  artwork(id: \"unused\") {\n    ...createTestEnv_artwork\n    __id\n  }\n}\n\nfragment createTestEnv_artwork on Artwork {\n  title\n  artist {\n    name\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createTestEnvQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "createTestEnv_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createTestEnvQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
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
(node as any).hash = '47aed525caea3505fcfc274e548e04d0';
export default node;
