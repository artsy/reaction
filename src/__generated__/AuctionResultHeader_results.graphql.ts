/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResultHeader_results = {
    readonly name: string | null;
    readonly " $refType": "AuctionResultHeader_results";
};
export type AuctionResultHeader_results$data = AuctionResultHeader_results;
export type AuctionResultHeader_results$key = {
    readonly " $data"?: AuctionResultHeader_results$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultHeader_results">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AuctionResultHeader_results",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '68697fa3083a4189bb66b2d8f838f777';
export default node;
