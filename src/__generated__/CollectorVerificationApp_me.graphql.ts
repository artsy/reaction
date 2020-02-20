/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectorVerificationApp_me = {
    readonly name: string | null;
    readonly identityVerification: {
        readonly id: string;
        readonly state: string;
        readonly invitationExpiresAt: string | null;
    } | null;
    readonly " $refType": "CollectorVerificationApp_me";
};
export type CollectorVerificationApp_me$data = CollectorVerificationApp_me;
export type CollectorVerificationApp_me$key = {
    readonly " $data"?: CollectorVerificationApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectorVerificationApp_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectorVerificationApp_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "id",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "identityVerification",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "IdentityVerification",
      "plural": false,
      "selections": [
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
          "name": "state",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "invitationExpiresAt",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '9cf085e732ed7ebf724d0bee0c6eb936';
export default node;
