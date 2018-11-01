/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _UserSettingsPayments_me$ref: unique symbol;
export type UserSettingsPayments_me$ref = typeof _UserSettingsPayments_me$ref;
export type UserSettingsPayments_me = {
    readonly id: string;
    readonly creditCards: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly brand: string;
                readonly last_digits: string;
                readonly expiration_year: number;
                readonly expiration_month: number;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": UserSettingsPayments_me$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "UserSettingsPayments_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCards",
      "storageKey": null,
      "args": null,
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
                v0,
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
                v1
              ]
            }
          ]
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '09bf7d51229f4c755942119322de3efb';
export default node;
