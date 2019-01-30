/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestAliasPrecendenceQueryVariables = {};
export type createMockNetworkLayerTestAliasPrecendenceQueryResponse = {
    readonly artist: ({
        readonly forSaleArtworks: ReadonlyArray<({
            readonly __id: string;
        }) | null> | null;
    }) | null;
};
export type createMockNetworkLayerTestAliasPrecendenceQuery = {
    readonly response: createMockNetworkLayerTestAliasPrecendenceQueryResponse;
    readonly variables: createMockNetworkLayerTestAliasPrecendenceQueryVariables;
};



/*
query createMockNetworkLayerTestAliasPrecendenceQuery {
  artist(id: "banksy") {
    forSaleArtworks: artworks(filter: IS_FOR_SALE) {
      __id
    }
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artist",
    "storageKey": "artist(id:\"banksy\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "banksy",
        "type": "String!"
      }
    ],
    "concreteType": "Artist",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "forSaleArtworks",
        "name": "artworks",
        "storageKey": "artworks(filter:\"IS_FOR_SALE\")",
        "args": [
          {
            "kind": "Literal",
            "name": "filter",
            "value": "IS_FOR_SALE",
            "type": "[ArtistArtworksFilters]"
          }
        ],
        "concreteType": "Artwork",
        "plural": true,
        "selections": [
          v0
        ]
      },
      v0
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
  "id": null,
  "text": "query createMockNetworkLayerTestAliasPrecendenceQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworks(filter: IS_FOR_SALE) {\n      __id\n    }\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "argumentDefinitions": [],
    "selections": v1
  }
};
})();
(node as any).hash = 'ce15fb8d6e1436f250f61e9fb17cccb3';
export default node;
