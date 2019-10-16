/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { AuthenticityCertificate_artwork$ref } from "./AuthenticityCertificate_artwork.graphql";
export type AuthenticityCertificateTestQueryVariables = {};
export type AuthenticityCertificateTestQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": AuthenticityCertificate_artwork$ref;
    }) | null;
};
export type AuthenticityCertificateTestQuery = {
    readonly response: AuthenticityCertificateTestQueryResponse;
    readonly variables: AuthenticityCertificateTestQueryVariables;
};



/*
query AuthenticityCertificateTestQuery {
  artwork(id: "whatevs") {
    ...AuthenticityCertificate_artwork
    __id
  }
}

fragment AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  is_biddable
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
  "name": "AuthenticityCertificateTestQuery",
  "id": null,
  "text": "query AuthenticityCertificateTestQuery {\n  artwork(id: \"whatevs\") {\n    ...AuthenticityCertificate_artwork\n    __id\n  }\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AuthenticityCertificateTestQuery",
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
            "name": "AuthenticityCertificate_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AuthenticityCertificateTestQuery",
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
            "name": "hasCertificateOfAuthenticity",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_biddable",
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
(node as any).hash = '4eb77c6a8491f223fde8a34290f5c854';
export default node;
