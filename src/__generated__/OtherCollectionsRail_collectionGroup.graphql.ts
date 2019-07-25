/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { OtherCollectionEntity_member$ref } from "./OtherCollectionEntity_member.graphql";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _OtherCollectionsRail_collectionGroup$ref: unique symbol;
export type OtherCollectionsRail_collectionGroup$ref = typeof _OtherCollectionsRail_collectionGroup$ref;
export type OtherCollectionsRail_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly " $fragmentRefs": OtherCollectionEntity_member$ref;
    }>;
    readonly " $refType": OtherCollectionsRail_collectionGroup$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "OtherCollectionsRail_collectionGroup",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
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
          "name": "OtherCollectionEntity_member",
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
(node as any).hash = '6f17d980c261d156126a25c34bacc8d7';
export default node;
