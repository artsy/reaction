/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherAuctions_sales = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly " $fragmentRefs": FragmentRefs<"AuctionCard_sale">;
        } | null;
    } | null> | null;
    readonly " $refType": "OtherAuctions_sales";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "OtherAuctions_sales",
  "type": "SaleConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Sale",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "AuctionCard_sale",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '200315e464d82a2fd268e73a0713d541';
export default node;
