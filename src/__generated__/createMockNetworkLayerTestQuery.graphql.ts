/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerTestQueryVariables = {};
export type createMockNetworkLayerTestQueryResponse = {
    readonly artwork: ({
        readonly __id: string;
        readonly title: string | null;
    }) | null;
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
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artwork",
    "storageKey": "artwork(id:\"untitled\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "untitled",
        "type": "String!"
      }
    ],
    "concreteType": "Artwork",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "__id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "createMockNetworkLayerTestQuery",
  "id": null,
  "text": "query createMockNetworkLayerTestQuery {\n  artwork(id: \"untitled\") {\n    __id\n    title\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = '7d5663d7e3fdb24e39214db3ed9ea1b7';
export default node;
