/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsRail_collections$ref: unique symbol;
export type CollectionsRail_collections$ref = typeof _CollectionsRail_collections$ref;
export type CollectionsRail_collections = ReadonlyArray<{
    readonly slug: string;
    readonly headerImage: string | null;
    readonly title: string;
    readonly price_guidance: number | null;
    readonly show_on_editorial: boolean;
    readonly " $refType": CollectionsRail_collections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsRail_collections",
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
      "name": "headerImage",
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
      "name": "price_guidance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "show_on_editorial",
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
(node as any).hash = '0f65e624804361756b5f9d074b0a9f64';
export default node;
