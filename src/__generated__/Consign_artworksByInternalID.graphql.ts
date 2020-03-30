/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artworksByInternalID = ReadonlyArray<{
    readonly internalID: string;
    readonly image: {
        readonly aspectRatio: number;
        readonly width: number | null;
        readonly height: number | null;
        readonly imageURL: string | null;
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
    readonly " $refType": "Consign_artworksByInternalID";
}>;
export type Consign_artworksByInternalID$data = Consign_artworksByInternalID;
export type Consign_artworksByInternalID$key = ReadonlyArray<{
    readonly " $data"?: Consign_artworksByInternalID$data;
    readonly " $fragmentRefs": FragmentRefs<"Consign_artworksByInternalID">;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "width",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "height",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Consign_artworksByInternalID",
  "type": "Artwork",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
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
          "kind": "ScalarField",
          "alias": null,
          "name": "aspectRatio",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": "imageURL",
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "medium"
            }
          ],
          "storageKey": "url(version:\"medium\")"
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "resized",
          "storageKey": "resized(height:395)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 395
            }
          ],
          "concreteType": "ResizedImageUrl",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
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
      "kind": "FragmentSpread",
      "name": "FillwidthItem_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = '9407863d8a3f3170ea1560281d28a880';
export default node;
