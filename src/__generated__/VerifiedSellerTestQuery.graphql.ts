/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { VerifiedSeller_artwork$ref } from "./VerifiedSeller_artwork.graphql";
export type VerifiedSellerTestQueryVariables = {};
export type VerifiedSellerTestQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": VerifiedSeller_artwork$ref;
    }) | null;
};
export type VerifiedSellerTestQuery = {
    readonly response: VerifiedSellerTestQueryResponse;
    readonly variables: VerifiedSellerTestQueryVariables;
};



/*
query VerifiedSellerTestQuery {
  artwork(id: "whatevs") {
    ...VerifiedSeller_artwork
    __id
  }
}

fragment VerifiedSeller_artwork on Artwork {
  is_biddable
  partner {
    isVerifiedSeller
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
    "value": "whatevs",
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
  "name": "VerifiedSellerTestQuery",
  "id": null,
  "text": "query VerifiedSellerTestQuery {\n  artwork(id: \"whatevs\") {\n    ...VerifiedSeller_artwork\n    __id\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable\n  partner {\n    isVerifiedSeller\n    name\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "VerifiedSellerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "VerifiedSeller_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "VerifiedSellerTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_biddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isVerifiedSeller",
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
(node as any).hash = '84408f8b9b2e5182fb105912e8cb83a3';
export default node;
