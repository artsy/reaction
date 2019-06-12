/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestAliasPrecendenceQueryVariables = {};
export type createMockNetworkLayerTestAliasPrecendenceQueryResponse = {
    readonly artist: {
        readonly forSaleArtworks: ReadonlyArray<{
            readonly __id: string;
        } | null> | null;
    } | null;
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
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "banksy"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": "IS_FOR_SALE"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
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
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"banksy\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "forSaleArtworks",
            "name": "artworks",
            "storageKey": "artworks(filter:\"IS_FOR_SALE\")",
            "args": (v1/*: any*/),
            "concreteType": "Artwork",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"banksy\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "forSaleArtworks",
            "name": "artworks",
            "storageKey": "artworks(filter:\"IS_FOR_SALE\")",
            "args": (v1/*: any*/),
            "concreteType": "Artwork",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestAliasPrecendenceQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestAliasPrecendenceQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworks(filter: IS_FOR_SALE) {\n      __id\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ce15fb8d6e1436f250f61e9fb17cccb3';
export default node;
