/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _MarketingCollectionsPreview_marketingCollections$ref: unique symbol;
export type MarketingCollectionsPreview_marketingCollections$ref = typeof _MarketingCollectionsPreview_marketingCollections$ref;
export type MarketingCollectionsPreview_marketingCollections = ReadonlyArray<{
    readonly title: string;
    readonly slug: string;
    readonly headerImage: string | null;
    readonly " $refType": MarketingCollectionsPreview_marketingCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "MarketingCollectionsPreview_marketingCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
};
(node as any).hash = 'fd7297f8188551f5c22af391c1450af0';
export default node;
