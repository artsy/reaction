/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsHubsHomepageNav_marketingCollections$ref: unique symbol;
export type CollectionsHubsHomepageNav_marketingCollections$ref = typeof _CollectionsHubsHomepageNav_marketingCollections$ref;
export type CollectionsHubsHomepageNav_marketingCollections = ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": CollectionsHubsHomepageNav_marketingCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsHomepageNav_marketingCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
      "name": "thumbnail",
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
(node as any).hash = '57db5beb8e6251df4cb00a9a980ed7f9';
export default node;
