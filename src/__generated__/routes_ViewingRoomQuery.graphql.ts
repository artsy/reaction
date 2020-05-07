/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_ViewingRoomQueryVariables = {};
export type routes_ViewingRoomQueryResponse = {
    readonly artist: {
        readonly id: string;
    } | null;
};
export type routes_ViewingRoomQuery = {
    readonly response: routes_ViewingRoomQueryResponse;
    readonly variables: routes_ViewingRoomQueryVariables;
};



/*
query routes_ViewingRoomQuery {
  artist(id: "pablo-picasso") {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "artist",
    "storageKey": "artist(id:\"pablo-picasso\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "pablo-picasso"
      }
    ],
    "concreteType": "Artist",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ViewingRoomQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ViewingRoomQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ViewingRoomQuery",
    "id": null,
    "text": "query routes_ViewingRoomQuery {\n  artist(id: \"pablo-picasso\") {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '03c933816cc1cb8659734677a7104d93';
export default node;
