/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationApp_me = {
    readonly internalID: string;
    readonly name: string | null;
    readonly identityVerification: {
        readonly internalID: string;
        readonly userID: string;
    } | null;
    readonly " $refType": "IdentityVerificationApp_me";
};
export type IdentityVerificationApp_me$data = IdentityVerificationApp_me;
export type IdentityVerificationApp_me$key = {
    readonly " $data"?: IdentityVerificationApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_me">;
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
  "name": "IdentityVerificationApp_me",
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
          "name": "userID",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = '9cb31391ccfe9a90dfd97d9d6e4330c1';
export default node;
