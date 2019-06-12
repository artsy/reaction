/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    readonly gene_id?: string | null;
    readonly clientMutationId?: string | null;
};
export type FollowGeneButtonMutationVariables = {
    readonly input: FollowGeneInput;
};
export type FollowGeneButtonMutationResponse = {
    readonly followGene: {
        readonly gene: {
            readonly __id: string;
            readonly is_followed: boolean | null;
        } | null;
    } | null;
};
export type FollowGeneButtonMutation = {
    readonly response: FollowGeneButtonMutationResponse;
    readonly variables: FollowGeneButtonMutationVariables;
};



/*
mutation FollowGeneButtonMutation(
  $input: FollowGeneInput!
) {
  followGene(input: $input) {
    gene {
      __id
      is_followed
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowGeneInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "is_followed",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowGeneButtonMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followGene",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowGenePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "gene",
            "storageKey": null,
            "args": null,
            "concreteType": "Gene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowGeneButtonMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followGene",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "FollowGenePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "gene",
            "storageKey": null,
            "args": null,
            "concreteType": "Gene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "FollowGeneButtonMutation",
    "id": null,
    "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      __id\n      is_followed\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'db00447f1c033c153937a7380efcbc6b';
export default node;
