/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsHubsNav_marketingHubCollections$ref: unique symbol;
export type CollectionsHubsNav_marketingHubCollections$ref = typeof _CollectionsHubsNav_marketingHubCollections$ref;
export type CollectionsHubsNav_marketingHubCollections = ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": CollectionsHubsNav_marketingHubCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsNav_marketingHubCollections",
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
(node as any).hash = '459c406a45d0cbce01052c982a5228ff';
export default node;
