/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignMeta_artist" | "ArtistConsignHeader_artist" | "ArtistConsignRecentlySold_artist" | "ArtistConsignPageViews_artist" | "ArtistConsignMarketTrends_artist">;
    readonly " $refType": "Consign_artist";
};
export type Consign_artist$data = Consign_artist;
export type Consign_artist$key = {
    readonly " $data"?: Consign_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Consign_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Consign_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignMeta_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeader_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignRecentlySold_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignPageViews_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignMarketTrends_artist",
      "args": null
    }
  ]
};
(node as any).hash = '9a8df95942530fb1e47cc23ba3f98609';
export default node;
