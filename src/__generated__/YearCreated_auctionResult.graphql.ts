/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type YearCreated_auctionResult = {
    readonly createdYearRange: {
        readonly startAt: number | null;
        readonly endAt: number | null;
    } | null;
    readonly " $refType": "YearCreated_auctionResult";
};
export type YearCreated_auctionResult$data = YearCreated_auctionResult;
export type YearCreated_auctionResult$key = {
    readonly " $data"?: YearCreated_auctionResult$data;
    readonly " $fragmentRefs": FragmentRefs<"YearCreated_auctionResult">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "YearCreated_auctionResult",
  "type": "AuctionResultConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "createdYearRange",
      "storageKey": null,
      "args": null,
      "concreteType": "YearRange",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "startAt",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "endAt",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '3e93539d72a62df3b802b35669e30120';
export default node;
