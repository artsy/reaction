/**
 * @generated SignedSource<<393e9b74528585bc5ba883f42145df0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowGeneInput = {
  clientMutationId?: string | null;
  geneID?: string | null;
  unfollow?: boolean | null;
};
export type FollowGeneButtonMutation$variables = {
  input: FollowGeneInput;
};
export type FollowGeneButtonMutationVariables = FollowGeneButtonMutation$variables;
export type FollowGeneButtonMutation$data = {
  readonly followGene: {
    readonly gene: {
      readonly id: string;
      readonly is_followed: boolean | null;
    } | null;
  } | null;
};
export type FollowGeneButtonMutationResponse = FollowGeneButtonMutation$data;
export type FollowGeneButtonMutation = {
  variables: FollowGeneButtonMutationVariables;
  response: FollowGeneButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowGenePayload",
    "kind": "LinkedField",
    "name": "followGene",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowGeneButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowGeneButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e28c0e11c7159f232e6872d6703c736e",
    "id": null,
    "metadata": {},
    "name": "FollowGeneButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      id\n      is_followed: isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e730f396b1bfca255e1e35cb6913dda";

export default node;
