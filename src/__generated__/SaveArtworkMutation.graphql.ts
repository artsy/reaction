/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SaveArtworkMutationVariables = {
    readonly input: {
        readonly artwork_id: string | null;
        readonly remove: boolean | null;
        readonly clientMutationId: string | null;
    };
};
export type SaveArtworkMutationResponse = {
    readonly saveArtwork: ({
        readonly artwork: ({
            readonly is_saved: boolean | null;
        }) | null;
    }) | null;
};



/*
mutation SaveArtworkMutation(
  $input: SaveArtworkInput!
) {
  saveArtwork(input: $input) {
    artwork {
      is_saved
      __id
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
        "variableName": "input",
        "type": "SaveArtworkInput!"
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
            "name": "is_saved",
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
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SaveArtworkMutation",
  "id": null,
  "text": "mutation SaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      is_saved\n      __id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SaveArtworkMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SaveArtworkMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '691d5afb5f5bfd147f30029511d66cb0';
export default node;
