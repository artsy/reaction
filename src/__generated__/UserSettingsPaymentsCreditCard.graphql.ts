/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _UserSettingsPaymentsCreditCard$ref: unique symbol;
export type UserSettingsPaymentsCreditCard$ref = typeof _UserSettingsPaymentsCreditCard$ref;
export type UserSettingsPaymentsCreditCard = {
    readonly __id: string;
    readonly id: string;
    readonly brand: string;
    readonly last_digits: string;
    readonly expiration_year: number;
    readonly expiration_month: number;
    readonly __typename: "CreditCard";
    readonly " $refType": UserSettingsPaymentsCreditCard$ref;
} & ({
    readonly __typename: "CreditCard";
} | {
    /*This will never be '% other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
});



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
      "name": "brand",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "last_digits",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "expiration_year",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "expiration_month",
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
(node as any).hash = '1863425d7a32a3efc69f0f7df7032585';
export default node;
