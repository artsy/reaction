/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyOrdersCreditCard = {
    readonly id: string;
    readonly internalID: string;
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
    readonly __typename: "CreditCard";
    readonly " $refType": "MyOrdersCreditCard";
};
export type MyOrdersCreditCard$data = MyOrdersCreditCard;
export type MyOrdersCreditCard$key = {
    readonly " $data"?: MyOrdersCreditCard$data;
    readonly " $fragmentRefs": FragmentRefs<"MyOrdersCreditCard">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "MyOrdersCreditCard",
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
      "alias": null,
      "name": "lastDigits",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "expirationYear",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
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
(node as any).hash = '9a159cc21dece319e0bfc975e9b67933';
export default node;
