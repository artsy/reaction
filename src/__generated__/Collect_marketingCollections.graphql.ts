/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { CollectionsHubsNav_marketingCollections$ref } from "./CollectionsHubsNav_marketingCollections.graphql";
declare const _Collect_marketingCollections$ref: unique symbol;
export type Collect_marketingCollections$ref = typeof _Collect_marketingCollections$ref;
export type Collect_marketingCollections = ReadonlyArray<{
    readonly " $fragmentRefs": CollectionsHubsNav_marketingCollections$ref;
    readonly " $refType": Collect_marketingCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Collect_marketingCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingCollections",
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
};
(node as any).hash = '1c038f9b6222b1a517dc8fcb0b1181e4';
export default node;
