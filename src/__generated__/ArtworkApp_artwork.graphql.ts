/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkBanner_artwork$ref } from "./ArtworkBanner_artwork.graphql";
import { ArtworkBrowser_artwork$ref } from "./ArtworkBrowser_artwork.graphql";
import { ArtworkDetails_artwork$ref } from "./ArtworkDetails_artwork.graphql";
import { ArtworkMeta_artwork$ref } from "./ArtworkMeta_artwork.graphql";
import { ArtworkSidebar_artwork$ref } from "./ArtworkSidebar_artwork.graphql";
import { OtherWorks_artwork$ref } from "./OtherWorks_artwork.graphql";
declare const _ArtworkApp_artwork$ref: unique symbol;
export type ArtworkApp_artwork$ref = typeof _ArtworkApp_artwork$ref;
export type ArtworkApp_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly id: string;
    }) | null;
    readonly " $fragmentRefs": ArtworkMeta_artwork$ref & ArtworkBanner_artwork$ref & ArtworkSidebar_artwork$ref & ArtworkDetails_artwork$ref & ArtworkBrowser_artwork$ref & OtherWorks_artwork$ref;
    readonly " $refType": ArtworkApp_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
  "name": "ArtworkApp_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        v0,
        v1
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkMeta_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkBanner_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetails_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkBrowser_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OtherWorks_artwork",
      "args": null
    },
    v1
  ]
};
})();
(node as any).hash = '5516d696f9f0c0f95a55f557822c4f67';
export default node;
