/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _MarketingCollectionsPreview_artist$ref: unique symbol;
export type MarketingCollectionsPreview_artist$ref = typeof _MarketingCollectionsPreview_artist$ref;
export type MarketingCollectionsPreview_artist = {
    readonly marketingCollections: ReadonlyArray<({
        readonly title: string;
        readonly slug: string;
        readonly headerImage: string | null;
    }) | null> | null;
    readonly " $refType": MarketingCollectionsPreview_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "MarketingCollectionsPreview_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "marketingCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
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
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "headerImage",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "__id",
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '1a0ec55c4d971b5efd9e149316718c9c';
export default node;
