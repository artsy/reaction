/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artworksByInternalID = ReadonlyArray<{
    readonly internalID: string;
    readonly image: {
        readonly aspectRatio: number;
        readonly imageURL: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
    readonly " $refType": "Consign_artworksByInternalID";
}>;
export type Consign_artworksByInternalID$data = Consign_artworksByInternalID;
export type Consign_artworksByInternalID$key = ReadonlyArray<{
    readonly " $data"?: Consign_artworksByInternalID$data;
    readonly " $fragmentRefs": FragmentRefs<"Consign_artworksByInternalID">;
}>;



const node: ReaderFragment = {
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "imageURL",
          "args": null,
          "storageKey": null
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
(node as any).hash = '70e5ab8af91f3990cdbe85e04fa61f52';
export default node;
