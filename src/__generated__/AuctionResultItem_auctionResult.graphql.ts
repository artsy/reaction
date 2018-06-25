/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type AuctionResultItem_auctionResult = {
    readonly title: string | null;
    readonly dimension_text: string | null;
    readonly organization: string | null;
    readonly images: ({
        readonly thumbnail: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly description: string | null;
    readonly date_text: string | null;
    readonly sale_date_text: string | null;
    readonly price_realized: ({
        readonly display: string | null;
        readonly cents_usd: number | null;
    }) | null;
    readonly estimate: ({
        readonly display: string | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "AuctionResultItem_auctionResult",
  "type": "AuctionResult",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "dimension_text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "organization",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "thumbnail",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date_text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "sale_date_text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "price_realized",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cents_usd",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "estimate",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "plural": false,
      "selections": [
        v0
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = '1d4be571cc01236aafed3f8ea79c1918';
export default node;
