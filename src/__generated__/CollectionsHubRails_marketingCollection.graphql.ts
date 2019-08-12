/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistSeriesRail_collectionGroup$ref } from "./ArtistSeriesRail_collectionGroup.graphql";
import { FeaturedCollectionsRails_collectionGroup$ref } from "./FeaturedCollectionsRails_collectionGroup.graphql";
import { OtherCollectionsRail_collectionGroup$ref } from "./OtherCollectionsRail_collectionGroup.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _CollectionsHubRails_marketingCollection$ref: unique symbol;
export type CollectionsHubRails_marketingCollection$ref = typeof _CollectionsHubRails_marketingCollection$ref;
export type CollectionsHubRails_marketingCollection = {
    readonly linkedCollections: ReadonlyArray<{
        readonly groupType: MarketingGroupTypes;
        readonly " $fragmentRefs": FeaturedCollectionsRails_collectionGroup$ref & OtherCollectionsRail_collectionGroup$ref & ArtistSeriesRail_collectionGroup$ref;
    }>;
    readonly " $refType": CollectionsHubRails_marketingCollection$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubRails_marketingCollection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "linkedCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionGroup",
      "plural": true,
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
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6390a64b7992f9361792f0cb66320097';
export default node;
