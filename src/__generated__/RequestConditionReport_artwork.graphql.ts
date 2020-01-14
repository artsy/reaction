/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReport_artwork = {
    readonly saleArtwork: {
        readonly internalID: string;
    } | null;
    readonly " $refType": "RequestConditionReport_artwork";
};
export type RequestConditionReport_artwork$data = RequestConditionReport_artwork;
export type RequestConditionReport_artwork$key = {
    readonly " $data"?: RequestConditionReport_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestConditionReport_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "RequestConditionReport_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "saleArtwork",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '569897ae7c49a7602d3e0089e3553abd';
export default node;
