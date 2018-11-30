/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SelectedExhibitions_exhibitions$ref: unique symbol;
export type SelectedExhibitions_exhibitions$ref = typeof _SelectedExhibitions_exhibitions$ref;
export type SelectedExhibitions_exhibitions = ReadonlyArray<{
    readonly partner: ({
        readonly name?: string | null;
    }) | null;
    readonly name: string | null;
    readonly start_at: string | null;
    readonly cover_image: ({
        readonly cropped: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly city: string | null;
    readonly " $refType": SelectedExhibitions_exhibitions$ref;
}>;



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  v1
];
return {
  "kind": "Fragment",
  "name": "SelectedExhibitions_exhibitions",
  "type": "Show",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "InlineFragment",
          "type": "Partner",
          "selections": v2
        },
        {
          "kind": "InlineFragment",
          "type": "ExternalPartner",
          "selections": v2
        }
      ]
    },
    v1,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "start_at",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "YYYY",
          "type": "String"
        }
      ],
      "storageKey": "start_at(format:\"YYYY\")"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "cover_image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:600,width:800)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 600,
              "type": "Int!"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 800,
              "type": "Int!"
            }
          ],
          "concreteType": "CroppedImageUrl",
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
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "city",
      "args": null,
      "storageKey": null
    },
    v0
  ]
};
})();
(node as any).hash = '3a533b1e1bb6598fc358c2dd076117a0';
export default node;
