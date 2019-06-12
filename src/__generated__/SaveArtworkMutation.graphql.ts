/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SaveArtworkInput = {
    readonly artwork_id?: string | null;
    readonly remove?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type SaveArtworkMutationVariables = {
    readonly input: SaveArtworkInput;
};
export type SaveArtworkMutationResponse = {
    readonly saveArtwork: {
        readonly artwork: {
            readonly __id: string;
            readonly id: string;
            readonly is_saved: boolean | null;
        } | null;
    } | null;
};
export type SaveArtworkMutation = {
    readonly response: SaveArtworkMutationResponse;
    readonly variables: SaveArtworkMutationVariables;
};



/*
mutation SaveArtworkMutation(
  $input: SaveArtworkInput!
) {
  saveArtwork(input: $input) {
    artwork {
      __id
      id
      is_saved
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SaveArtworkInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "saveArtwork",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SaveArtworkPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": null,
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
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_saved",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SaveArtworkMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SaveArtworkMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SaveArtworkMutation",
    "id": null,
    "text": "mutation SaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      __id\n      id\n      is_saved\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b993cf24b6d048abd7c9e33bd30dcc2a';
export default node;
