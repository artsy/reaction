/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppSecondFactorMethodSecondFactor = {
    readonly internalID: string;
    readonly name: string | null;
    readonly otpProvisioningURI: string | null;
    readonly otpSecret: string | null;
    readonly __typename: "AppSecondFactor";
    readonly " $refType": "AppSecondFactorMethodSecondFactor";
};
export type AppSecondFactorMethodSecondFactor$data = AppSecondFactorMethodSecondFactor;
export type AppSecondFactorMethodSecondFactor$key = {
    readonly " $data"?: AppSecondFactorMethodSecondFactor$data;
    readonly " $fragmentRefs": FragmentRefs<"AppSecondFactorMethodSecondFactor">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AppSecondFactorMethodSecondFactor",
  "type": "AppSecondFactor",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "otpProvisioningURI",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "otpSecret",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '13c61e55ba421bb740dbaa415cec62a0';
export default node;
