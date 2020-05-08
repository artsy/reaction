/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomArtworkDetails_artwork = {
    readonly id: string;
    readonly artistNames: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly description: string | null;
    readonly href: string | null;
    readonly " $refType": "ViewingRoomArtworkDetails_artwork";
};
export type ViewingRoomArtworkDetails_artwork$data = ViewingRoomArtworkDetails_artwork;
export type ViewingRoomArtworkDetails_artwork$key = {
    readonly " $data"?: ViewingRoomArtworkDetails_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomArtworkDetails_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomArtworkDetails_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "artistNames",
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
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6ce291591f5bafe209418bea9cf7f3e1';
export default node;
