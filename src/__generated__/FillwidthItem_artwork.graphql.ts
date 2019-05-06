/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Badge_artwork$ref } from "./Badge_artwork.graphql";
import { Metadata_artwork$ref } from "./Metadata_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _FillwidthItem_artwork$ref: unique symbol;
export type FillwidthItem_artwork$ref = typeof _FillwidthItem_artwork$ref;
export type FillwidthItem_artwork = {
    readonly image: ({
        readonly placeholder: string | null;
        readonly url: string | null;
        readonly aspect_ratio: number;
    }) | null;
    readonly href: string | null;
    readonly " $fragmentRefs": Metadata_artwork$ref & Save_artwork$ref & Badge_artwork$ref;
    readonly " $refType": FillwidthItem_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "FillwidthItem_artwork",
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
      "kind": "FragmentSpread",
      "name": "Badge_artwork",
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
(node as any).hash = '2d0cf4dcb3c793bdd36a81e3fe54d7e6';
export default node;
