/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FeaturedCollectionsRails_collectionGroup$ref } from "./FeaturedCollectionsRails_collectionGroup.graphql";
import { OtherCollectionsRail_collectionGroup$ref } from "./OtherCollectionsRail_collectionGroup.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _CollectionsHubRails_linkedCollections$ref: unique symbol;
export type CollectionsHubRails_linkedCollections$ref = typeof _CollectionsHubRails_linkedCollections$ref;
export type CollectionsHubRails_linkedCollections = ReadonlyArray<{
    readonly groupType: MarketingGroupTypes;
    readonly " $fragmentRefs": FeaturedCollectionsRails_collectionGroup$ref & OtherCollectionsRail_collectionGroup$ref;
    readonly " $refType": CollectionsHubRails_linkedCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubRails_linkedCollections",
  "type": "MarketingCollectionGroup",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "groupType",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeaturedCollectionsRails_collectionGroup",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OtherCollectionsRail_collectionGroup",
      "args": null
    }
  ]
};
(node as any).hash = '3c3d0a5aba6c13b2ffaa722faec0417a';
export default node;
