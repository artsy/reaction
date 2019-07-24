/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FeaturedCollectionsRails_collectionGroup$ref } from "./FeaturedCollectionsRails_collectionGroup.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _CollectionsHubRails_marketingCollection$ref: unique symbol;
export type CollectionsHubRails_marketingCollection$ref = typeof _CollectionsHubRails_marketingCollection$ref;
export type CollectionsHubRails_marketingCollection = {
    readonly linkedCollections: ReadonlyArray<{
        readonly groupType: MarketingGroupTypes;
        readonly " $fragmentRefs": FeaturedCollectionsRails_collectionGroup$ref;
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
(node as any).hash = 'c33f0d322c9f1c979c6e831c4c1d8331';
export default node;
