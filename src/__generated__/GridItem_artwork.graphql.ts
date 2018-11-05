/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Metadata_artwork$ref } from "./Metadata_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _GridItem_artwork$ref: unique symbol;
export type GridItem_artwork$ref = typeof _GridItem_artwork$ref;
export type GridItem_artwork = {
    readonly image: ({
        readonly placeholder: string | null;
        readonly url: string | null;
        readonly aspect_ratio: number;
    }) | null;
    readonly is_biddable: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly href: string | null;
    readonly " $fragmentRefs": Metadata_artwork$ref & Save_artwork$ref;
    readonly " $refType": GridItem_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "GridItem_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "placeholder",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large",
              "type": "[String]"
            }
          ],
          "storageKey": "url(version:\"large\")"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "aspect_ratio",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_biddable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_acquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Metadata_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Save_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '7d787e18a67dccb515e738babcc841fc';
export default node;
