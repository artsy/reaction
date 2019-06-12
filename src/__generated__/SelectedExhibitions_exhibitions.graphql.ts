/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _SelectedExhibitions_exhibitions$ref: unique symbol;
export type SelectedExhibitions_exhibitions$ref = typeof _SelectedExhibitions_exhibitions$ref;
export type SelectedExhibitions_exhibitions = ReadonlyArray<{
    readonly partner: ({
        readonly name?: string | null;
    } & ({
        readonly name: string | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    })) | null;
    readonly name: string | null;
    readonly start_at: string | null;
    readonly cover_image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly city: string | null;
    readonly " $refType": SelectedExhibitions_exhibitions$ref;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
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
        {
          "kind": "InlineFragment",
          "type": "ExternalPartner",
          "selections": (v1/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Partner",
          "selections": (v1/*: any*/)
        }
      ]
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "start_at",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "YYYY"
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
              "value": 600
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 800
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
    }
  ]
};
})();
(node as any).hash = '3a533b1e1bb6598fc358c2dd076117a0';
export default node;
