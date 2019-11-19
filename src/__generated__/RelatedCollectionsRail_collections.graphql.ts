/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelatedCollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"RelatedCollectionEntity_collection">;
    readonly " $refType": "RelatedCollectionsRail_collections";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "RelatedCollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "RelatedCollectionEntity_collection",
      "args": null
    }
  ]
};
(node as any).hash = 'f64166e45d9b668bf3f49d0a9f334650';
export default node;
