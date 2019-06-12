/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SuggestedGenes_suggested_genes$ref } from "./SuggestedGenes_suggested_genes.graphql";
export type SuggestedGenesQueryVariables = {};
export type SuggestedGenesQueryResponse = {
    readonly suggested_genes: ReadonlyArray<{
        readonly " $fragmentRefs": SuggestedGenes_suggested_genes$ref;
    } | null> | null;
};
export type SuggestedGenesQuery = {
    readonly response: SuggestedGenesQueryResponse;
    readonly variables: SuggestedGenesQueryVariables;
};



/*
query SuggestedGenesQuery {
  suggested_genes {
    ...SuggestedGenes_suggested_genes
    id
  }
}

fragment SuggestedGenes_suggested_genes on Gene {
  id
  _id
  name
  image {
    cropped(width: 100, height: 100) {
      url
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SuggestedGenesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "suggested_genes",
        "storageKey": null,
        "args": null,
        "concreteType": "Gene",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SuggestedGenes_suggested_genes",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SuggestedGenesQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "suggested_genes",
        "storageKey": null,
        "args": null,
        "concreteType": "Gene",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "cropped",
                "storageKey": "cropped(height:100,width:100)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 100
                  }
                ],
                "concreteType": "CroppedImageUrl",
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
              (v0/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SuggestedGenesQuery",
    "id": null,
    "text": "query SuggestedGenesQuery {\n  suggested_genes {\n    ...SuggestedGenes_suggested_genes\n    id\n  }\n}\n\nfragment SuggestedGenes_suggested_genes on Gene {\n  id\n  _id\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '42530c5bcd10f72dbb90c9e06541717d';
export default node;
