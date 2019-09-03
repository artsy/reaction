/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { CollectionsHubsNav_marketingHubCollections$ref } from "./CollectionsHubsNav_marketingHubCollections.graphql";
declare const _Collect_marketingHubCollections$ref: unique symbol;
export type Collect_marketingHubCollections$ref = typeof _Collect_marketingHubCollections$ref;
export type Collect_marketingHubCollections = ReadonlyArray<{
    readonly " $fragmentRefs": CollectionsHubsNav_marketingHubCollections$ref;
    readonly " $refType": Collect_marketingHubCollections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Collect_marketingHubCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingHubCollections",
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
(node as any).hash = 'd2c8a937457d195a57fd7a72bf2ea361';
export default node;
