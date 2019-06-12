/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestAliasQueryVariables = {};
export type createMockNetworkLayerTestAliasQueryResponse = {
    readonly artist: {
        readonly forSaleArtworks: ReadonlyArray<{
            readonly __id: string;
        } | null> | null;
        readonly notForSaleArtworks: ReadonlyArray<{
            readonly __id: string;
        } | null> | null;
    } | null;
};
export type createMockNetworkLayerTestAliasQuery = {
    readonly response: createMockNetworkLayerTestAliasQueryResponse;
    readonly variables: createMockNetworkLayerTestAliasQueryVariables;
};



/*
query createMockNetworkLayerTestAliasQuery {
  artist(id: "banksy") {
    forSaleArtworks: artworks(filter: IS_FOR_SALE) {
      __id
      id
    }
    notForSaleArtworks: artworks(filter: IS_NOT_FOR_SALE) {
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
v3 = [
  (v2/*: any*/)
],
v4 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": "IS_NOT_FOR_SALE"
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v5/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestAliasQuery",
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
            "selections": (v3/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "notForSaleArtworks",
            "name": "artworks",
            "storageKey": "artworks(filter:\"IS_NOT_FOR_SALE\")",
            "args": (v4/*: any*/),
            "concreteType": "Artwork",
            "plural": true,
            "selections": (v3/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestAliasQuery",
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
            "selections": (v6/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "notForSaleArtworks",
            "name": "artworks",
            "storageKey": "artworks(filter:\"IS_NOT_FOR_SALE\")",
            "args": (v4/*: any*/),
            "concreteType": "Artwork",
            "plural": true,
            "selections": (v6/*: any*/)
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestAliasQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestAliasQuery {\n  artist(id: \"banksy\") {\n    forSaleArtworks: artworks(filter: IS_FOR_SALE) {\n      __id\n      id\n    }\n    notForSaleArtworks: artworks(filter: IS_NOT_FOR_SALE) {\n      __id\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7e9f3aa22daa4f72c6a1825d9f181356';
export default node;
