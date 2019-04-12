/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _PaymentPicker_me$ref: unique symbol;
export type PaymentPicker_me$ref = typeof _PaymentPicker_me$ref;
export type PaymentPicker_me = {
    readonly creditCards: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly brand: string;
                readonly last_digits: string;
                readonly expiration_month: number;
                readonly expiration_year: number;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": PaymentPicker_me$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "PaymentPicker_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCards",
      "storageKey": "creditCards(first:100)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 100,
          "type": "Int"
        }
      ],
      "concreteType": "CreditCardConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CreditCardEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "CreditCard",
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
                  "name": "expiration_month",
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
                v0
              ]
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'f9e6c519e41c5ce091e0ee36b1632f01';
export default node;
