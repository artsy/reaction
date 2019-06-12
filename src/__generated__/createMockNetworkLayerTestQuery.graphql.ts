/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestQueryVariables = {};
export type createMockNetworkLayerTestQueryResponse = {
    readonly artwork: {
        readonly __id: string;
        readonly title: string | null;
    } | null;
};
export type createMockNetworkLayerTestQuery = {
    readonly response: createMockNetworkLayerTestQueryResponse;
    readonly variables: createMockNetworkLayerTestQueryVariables;
};



/*
query createMockNetworkLayerTestQuery {
  artwork(id: "untitled") {
    __id
    title
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "untitled"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"untitled\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"untitled\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "createMockNetworkLayerTestQuery",
    "id": null,
    "text": "query createMockNetworkLayerTestQuery {\n  artwork(id: \"untitled\") {\n    __id\n    title\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7d5663d7e3fdb24e39214db3ed9ea1b7';
export default node;
