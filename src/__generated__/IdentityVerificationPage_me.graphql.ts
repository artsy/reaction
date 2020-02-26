/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationPage_me = {
    readonly internalID: string;
    readonly name: string | null;
    readonly identityVerification: {
        readonly internalID: string;
        readonly state: string;
        readonly userID: string;
    } | null;
    readonly " $refType": "IdentityVerificationPage_me";
};
export type IdentityVerificationPage_me$data = IdentityVerificationPage_me;
export type IdentityVerificationPage_me$key = {
    readonly " $data"?: IdentityVerificationPage_me$data;
    readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationPage_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "IdentityVerificationPage_me",
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
    (v0/*: any*/),
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
        (v0/*: any*/),
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
          "name": "userID",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = '3fa2bb16402dd44180fbeb17bb0c4a2d';
export default node;
