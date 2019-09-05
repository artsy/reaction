/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsHubsHomepageNav_marketingHubCollections$ref: unique symbol;
export type CollectionsHubsHomepageNav_marketingHubCollections$ref = typeof _CollectionsHubsHomepageNav_marketingHubCollections$ref;
export type CollectionsHubsHomepageNav_marketingHubCollections = ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": CollectionsHubsHomepageNav_marketingHubCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsHomepageNav_marketingHubCollections",
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
(node as any).hash = 'cf76894fb739249a114139809dfe01cb';
export default node;
