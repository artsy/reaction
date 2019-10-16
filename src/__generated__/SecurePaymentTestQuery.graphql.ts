/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SecurePayment_artwork$ref } from "./SecurePayment_artwork.graphql";
export type SecurePaymentTestQueryVariables = {};
export type SecurePaymentTestQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": SecurePayment_artwork$ref;
    }) | null;
};
export type SecurePaymentTestQuery = {
    readonly response: SecurePaymentTestQueryResponse;
    readonly variables: SecurePaymentTestQueryVariables;
};



/*
query SecurePaymentTestQuery {
  artwork(id: "whatevs") {
    ...SecurePayment_artwork
    __id
  }
}

fragment SecurePayment_artwork on Artwork {
  is_acquireable
  is_offerable
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
  "name": "SecurePaymentTestQuery",
  "id": null,
  "text": "query SecurePaymentTestQuery {\n  artwork(id: \"whatevs\") {\n    ...SecurePayment_artwork\n    __id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable\n  is_offerable\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SecurePaymentTestQuery",
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
            "name": "SecurePayment_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SecurePaymentTestQuery",
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
            "name": "is_acquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_offerable",
            "args": null,
            "storageKey": null
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '165920d44caabb5774c28db0aa6f8de1';
export default node;
