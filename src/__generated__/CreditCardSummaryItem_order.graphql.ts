/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CreditCardSummaryItem_order = {
    readonly creditCard: {
        readonly brand: string;
        readonly last_digits: string;
        readonly expiration_year: number;
        readonly expiration_month: number;
    } | null;
    readonly " $refType": "CreditCardSummaryItem_order";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CreditCardSummaryItem_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCard",
      "storageKey": null,
      "args": null,
      "concreteType": "CreditCard",
      "plural": false,
      "selections": [
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
        }
      ]
    }
  ]
};
(node as any).hash = 'd6b34c4ffb33135f2769b0b5c1d63c35';
export default node;
