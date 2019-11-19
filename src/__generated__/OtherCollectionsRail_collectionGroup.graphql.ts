/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
export type OtherCollectionsRail_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"OtherCollectionEntity_member">;
    }>;
    readonly " $refType": "OtherCollectionsRail_collectionGroup";
};



const node: ReaderFragment = {
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
        }
      ]
    }
  ]
};
(node as any).hash = '6f17d980c261d156126a25c34bacc8d7';
export default node;
