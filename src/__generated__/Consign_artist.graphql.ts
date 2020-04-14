/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignMeta_artist" | "ArtistConsignHeader_artist" | "ArtistConsignRecentlySold_artist" | "ArtistConsignPageViews_artist" | "ArtistConsignMarketTrends_artist" | "ArtistConsignHowToSell_artist" | "ArtistConsignSellArt_artist">;
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
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignHowToSell_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistConsignSellArt_artist",
      "args": null
    }
  ]
};
(node as any).hash = '103d9c682dae4f222178d7736413d4f0';
export default node;
