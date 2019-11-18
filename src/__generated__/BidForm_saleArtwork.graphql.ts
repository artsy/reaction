/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BidForm_saleArtwork = {
    readonly minimumNextBid: {
        readonly cents: number | null;
    } | null;
    readonly increments: ReadonlyArray<{
        readonly cents: number | null;
        readonly display: string | null;
    } | null> | null;
    readonly " $refType": "BidForm_saleArtwork";
};
export type BidForm_saleArtwork$data = BidForm_saleArtwork;
export type BidForm_saleArtwork$key = {
    readonly " $data"?: BidForm_saleArtwork$data;
    readonly " $fragmentRefs": FragmentRefs<"BidForm_saleArtwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "BidForm_saleArtwork",
  "type": "SaleArtwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "minimumNextBid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkMinimumNextBid",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "increments",
      "storageKey": "increments(useMyMaxBid:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "useMyMaxBid",
          "value": true
        }
      ],
      "concreteType": "BidIncrementsFormatted",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "display",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'e929d0b1f453429bad6f2adb041f92a9';
export default node;
