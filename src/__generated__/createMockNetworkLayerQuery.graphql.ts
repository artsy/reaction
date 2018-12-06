/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type createMockNetworkLayerQueryVariables = {
    readonly artworkID: string;
};
export type createMockNetworkLayerQueryResponse = {
    readonly artwork: ({
        readonly title: string | null;
    }) | null;
};
export type createMockNetworkLayerQuery = {
    readonly response: createMockNetworkLayerQueryResponse;
    readonly variables: createMockNetworkLayerQueryVariables;
};



/*
query createMockNetworkLayerQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    title
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artwork",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "artworkID",
        "type": "String!"
      }
    ],
    "concreteType": "Artwork",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "__id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "createMockNetworkLayerQuery",
  "id": null,
  "text": "query createMockNetworkLayerQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    title\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '77861129af0ff0de2faf595ad7ffa10b';
export default node;
