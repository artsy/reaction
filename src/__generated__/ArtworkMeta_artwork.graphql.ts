/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { SeoDataForArtwork_artwork$ref } from "./SeoDataForArtwork_artwork.graphql";
declare const _ArtworkMeta_artwork$ref: unique symbol;
export type ArtworkMeta_artwork$ref = typeof _ArtworkMeta_artwork$ref;
export type ArtworkMeta_artwork = {
    readonly href: string | null;
    readonly date: string | null;
    readonly artist_names: string | null;
    readonly sale_message: string | null;
    readonly partner: ({
        readonly name: string | null;
    }) | null;
    readonly image_rights: string | null;
    readonly is_shareable: boolean | null;
    readonly meta_image: ({
        readonly resized: ({
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly meta: ({
        readonly title: string | null;
        readonly description: string | null;
        readonly long_description: string | null;
    }) | null;
    readonly context: ({
        readonly __typename: "ArtworkContextFair";
        readonly id: string;
        readonly name: string | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $fragmentRefs": SeoDataForArtwork_artwork$ref;
    readonly " $refType": ArtworkMeta_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkMeta_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_shareable",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "artist_names",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "sale_message",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        v0,
        v1
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "image_rights",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "meta_image",
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "resized",
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 640,
              "type": "Int"
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large",
                "medium",
                "tall"
              ],
              "type": "[String]"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 640,
              "type": "Int"
            }
          ],
          "concreteType": "ResizedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "width",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "height",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "plural": false,
      "selections": [
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
          "name": "description",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 155,
              "type": "Int"
            }
          ],
          "storageKey": "description(limit:155)"
        },
        {
          "kind": "ScalarField",
          "alias": "long_description",
          "name": "description",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 200,
              "type": "Int"
            }
          ],
          "storageKey": "description(limit:200)"
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        },
        v1,
        {
          "kind": "InlineFragment",
          "type": "ArtworkContextFair",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            v0
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "SeoDataForArtwork_artwork",
      "args": null
    },
    v1
  ]
};
})();
(node as any).hash = '8bbbd0a2132b9ff450cd6a00a89583a5';
export default node;
