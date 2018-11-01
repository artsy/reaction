/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsApp_collections$ref: unique symbol;
export type CollectionsApp_collections$ref = typeof _CollectionsApp_collections$ref;
export type CollectionsApp_collections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly headerImage: string | null;
    readonly " $refType": CollectionsApp_collections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsApp_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
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
(node as any).hash = 'f3dd0cb1d3943fd6933e8c5919e6a1fe';
export default node;
