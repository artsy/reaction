/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistSeriesRail_collectionGroup$ref } from "./ArtistSeriesRail_collectionGroup.graphql";
import { FeaturedCollectionsRails_collectionGroup$ref } from "./FeaturedCollectionsRails_collectionGroup.graphql";
import { OtherCollectionsRail_collectionGroup$ref } from "./OtherCollectionsRail_collectionGroup.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _CollectionsHubRails_linkedCollections$ref: unique symbol;
export type CollectionsHubRails_linkedCollections$ref = typeof _CollectionsHubRails_linkedCollections$ref;
export type CollectionsHubRails_linkedCollections = ReadonlyArray<{
    readonly groupType: MarketingGroupTypes;
    readonly " $fragmentRefs": FeaturedCollectionsRails_collectionGroup$ref & OtherCollectionsRail_collectionGroup$ref & ArtistSeriesRail_collectionGroup$ref;
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
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistSeriesRail_collectionGroup",
      "args": null
    }
  ]
};
(node as any).hash = 'a7285e8c4087e97b3282b8c929f612be';
export default node;
