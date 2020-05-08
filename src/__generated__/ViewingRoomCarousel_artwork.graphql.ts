/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomCarousel_artwork = {
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly imageHref: string | null;
    } | null> | null;
    readonly " $refType": "ViewingRoomCarousel_artwork";
};
export type ViewingRoomCarousel_artwork$data = ViewingRoomCarousel_artwork;
export type ViewingRoomCarousel_artwork$key = {
    readonly " $data"?: ViewingRoomCarousel_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCarousel_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomCarousel_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "imageHref",
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large"
              ]
            }
          ],
          "storageKey": "url(version:[\"large\"])"
        }
      ]
    }
  ]
};
(node as any).hash = '9e994ea3c3e18477096bf472c72d4923';
export default node;
