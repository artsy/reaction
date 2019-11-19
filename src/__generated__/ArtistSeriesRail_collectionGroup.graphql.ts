/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
export type ArtistSeriesRail_collectionGroup = {
    readonly groupType: MarketingGroupTypes;
    readonly name: string;
    readonly members: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesEntity_member">;
    }>;
    readonly " $refType": "ArtistSeriesRail_collectionGroup";
};



const node: ReaderFragment = {
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
          "name": "ArtistSeriesEntity_member",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '74444f1335a930cac0d23033f2438ad6';
export default node;
