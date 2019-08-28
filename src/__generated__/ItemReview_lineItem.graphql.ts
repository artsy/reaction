/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ItemReview_lineItem$ref: unique symbol;
export type ItemReview_lineItem$ref = typeof _ItemReview_lineItem$ref;
export type ItemReview_lineItem = {
    readonly artwork: ({
        readonly artist_names: string | null;
        readonly title: string | null;
        readonly date: string | null;
        readonly medium: string | null;
        readonly dimensions: ({
            readonly in: string | null;
            readonly cm: string | null;
        }) | null;
        readonly attribution_class: ({
            readonly shortDescription: string | null;
        }) | null;
        readonly image: ({
            readonly resized: ({
                readonly url: string | null;
            }) | null;
        }) | null;
        readonly edition_sets: ReadonlyArray<({
            readonly id: string;
            readonly dimensions: ({
                readonly in: string | null;
                readonly cm: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly editionSetId: string | null;
    readonly " $refType": ItemReview_lineItem$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ItemReview_lineItem",
  "type": "CommerceLineItem",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artwork",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": false,
      "selections": [
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
          "name": "title",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "medium",
          "args": null,
          "storageKey": null
        },
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "attribution_class",
          "storageKey": null,
          "args": null,
          "concreteType": "AttributionClass",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shortDescription",
              "args": null,
              "storageKey": null
            },
            v1
          ]
        },
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
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(width:185)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 185,
                  "type": "Int"
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            v2
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edition_sets",
          "storageKey": null,
          "args": null,
          "concreteType": "EditionSet",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            v0,
            v1
          ]
        },
        v1
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "editionSetId",
      "args": null,
      "storageKey": null
    },
    v2
  ]
};
})();
(node as any).hash = 'c07dc43284e1d589e8b252309ad5443a';
export default node;
