/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type MarketingGroupTypes = "ArtistSeries" | "FeaturedCollections" | "OtherCollections" | "%future added value";
declare const _FeaturedCollectionsRails_marketingCollection$ref: unique symbol;
export type FeaturedCollectionsRails_marketingCollection$ref = typeof _FeaturedCollectionsRails_marketingCollection$ref;
export type FeaturedCollectionsRails_marketingCollection = {
    readonly linkedCollections: ReadonlyArray<{
        readonly groupType: MarketingGroupTypes;
        readonly name: string;
        readonly members: ReadonlyArray<{
            readonly id: string;
            readonly slug: string;
            readonly title: string;
            readonly description: string | null;
            readonly price_guidance: number | null;
        }>;
    }>;
    readonly " $refType": FeaturedCollectionsRails_marketingCollection$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "FeaturedCollectionsRails_marketingCollection",
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
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "title",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "description",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "price_guidance",
              "args": null,
              "storageKey": null
            },
            v0
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '8e3c2bb4e5b14d2783a09aed0719ef5d';
export default node;
