/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsHubsNav_marketingCollections$ref: unique symbol;
export type CollectionsHubsNav_marketingCollections$ref = typeof _CollectionsHubsNav_marketingCollections$ref;
export type CollectionsHubsNav_marketingCollections = ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": CollectionsHubsNav_marketingCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsNav_marketingCollections",
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
(node as any).hash = 'c4db8e5bdbdcd65e72b86c886378350b';
export default node;
