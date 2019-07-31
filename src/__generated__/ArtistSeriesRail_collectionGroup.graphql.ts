/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistSeriesEntity_member$ref } from "./ArtistSeriesEntity_member.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _ArtistSeriesRail_collectionGroup$ref: unique symbol;
export type ArtistSeriesRail_collectionGroup$ref = typeof _ArtistSeriesRail_collectionGroup$ref;
export type ArtistSeriesRail_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly members: ReadonlyArray<{
        readonly " $fragmentRefs": ArtistSeriesEntity_member$ref;
    }>;
    readonly " $refType": ArtistSeriesRail_collectionGroup$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistSeriesRail_collectionGroup",
  "type": "MarketingCollectionGroup",
  "metadata": null,
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
      "kind": "LinkedField",
      "alias": null,
      "name": "members",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistSeriesEntity_member",
          "args": null
        },
        {
          "kind": "ScalarField",
          "alias": "__id",
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '7479767af0f703142f82e6e5257f792f';
export default node;
