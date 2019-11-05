/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type UserSettingsPaymentsCreditCard = {
    readonly id: string;
    readonly internalID: string;
    readonly brand: string;
    readonly last_digits: string;
    readonly expiration_year: number;
    readonly expiration_month: number;
    readonly __typename: "CreditCard";
    readonly " $refType": "UserSettingsPaymentsCreditCard";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "UserSettingsPaymentsCreditCard",
  "type": "CreditCard",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "brand",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "last_digits",
      "name": "lastDigits",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "expiration_year",
      "name": "expirationYear",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "expiration_month",
      "name": "expirationMonth",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '3da77002887ae150680ac270f984cfba';
export default node;
