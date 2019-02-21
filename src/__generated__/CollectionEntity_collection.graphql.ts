/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionEntity_collection$ref: unique symbol;
export type CollectionEntity_collection$ref = typeof _CollectionEntity_collection$ref;
export type CollectionEntity_collection = {
    readonly slug: string;
    readonly headerImage: string | null;
    readonly title: string;
    readonly price_guidance: number | null;
    readonly show_on_editorial: boolean;
    readonly " $refType": CollectionEntity_collection$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionEntity_collection",
  "type": "MarketingCollection",
  "metadata": null,
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
(node as any).hash = '645090a25be570f93a76835e1bf44423';
export default node;
