/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherAuctions_sales = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"AuctionCard_sale">;
    readonly " $refType": "OtherAuctions_sales";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "OtherAuctions_sales",
  "type": "Sale",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "AuctionCard_sale",
      "args": null
    }
  ]
};
(node as any).hash = 'a958527d99f4fac7d2d2cd1c0e826c82';
export default node;
