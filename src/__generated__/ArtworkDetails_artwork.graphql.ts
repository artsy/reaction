/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref } from "./ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql";
import { ArtworkDetailsAboutTheWorkFromPartner_artwork$ref } from "./ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql";
import { ArtworkDetailsAdditionalInfo_artwork$ref } from "./ArtworkDetailsAdditionalInfo_artwork.graphql";
import { ArtworkDetailsArticles_artwork$ref } from "./ArtworkDetailsArticles_artwork.graphql";
declare const _ArtworkDetails_artwork$ref: unique symbol;
export type ArtworkDetails_artwork$ref = typeof _ArtworkDetails_artwork$ref;
export type ArtworkDetails_artwork = {
    readonly articles: ReadonlyArray<{
        readonly id: string;
    } | null> | null;
    readonly literature: string | null;
    readonly exhibition_history: string | null;
    readonly provenance: string | null;
    readonly " $fragmentRefs": ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref & ArtworkDetailsAboutTheWorkFromPartner_artwork$ref & ArtworkDetailsAdditionalInfo_artwork$ref & ArtworkDetailsArticles_artwork$ref;
    readonly " $refType": ArtworkDetails_artwork$ref;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkDetails_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(size:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": (v0/*: any*/),
      "storageKey": "literature(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "exhibition_history",
      "args": (v0/*: any*/),
      "storageKey": "exhibition_history(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "provenance",
      "args": (v0/*: any*/),
      "storageKey": "provenance(format:\"HTML\")"
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAdditionalInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsArticles_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = '13d5539efa074030bd4c1860ac720be0';
export default node;
