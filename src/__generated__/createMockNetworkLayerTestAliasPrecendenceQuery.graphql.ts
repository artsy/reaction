/**
 * @generated SignedSource<<aa41e9e803c2f9cc2d7389e57eea0068>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type createMockNetworkLayerTestAliasPrecendenceQuery$variables = {};
export type createMockNetworkLayerTestAliasPrecendenceQueryVariables = createMockNetworkLayerTestAliasPrecendenceQuery$variables;
export type createMockNetworkLayerTestAliasPrecendenceQuery$data = {
  readonly artist: {
    readonly forSaleArtworks: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type createMockNetworkLayerTestAliasPrecendenceQueryResponse = createMockNetworkLayerTestAliasPrecendenceQuery$data;
export type createMockNetworkLayerTestAliasPrecendenceQuery = {
  variables: createMockNetworkLayerTestAliasPrecendenceQueryVariables;
  response: createMockNetworkLayerTestAliasPrecendenceQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "banksy"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": "forSaleArtworks",
  "args": [
    {
      "kind": "Literal",
      "name": "filter",
      "value": "IS_FOR_SALE"
    }
  ],
  "concreteType": "ArtworkConnection",
  "kind": "LinkedField",
  "name": "artworksConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"banksy\")"
      }
    ]
  },
  "params": {
    "cacheID": "a8be7eed0e853c7b0b536eeede369966",
    "id": null,
    "metadata": {},
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "operationKind": "query",
    "text": "query createMockNetworkLayerTestAliasPrecendenceQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworksConnection(filter: IS_FOR_SALE) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "92c8ccb40dd497258b009d3930532e77";

export default node;
