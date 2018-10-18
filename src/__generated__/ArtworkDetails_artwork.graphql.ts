/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref } from "./ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql";
import { ArtworkDetailsAboutTheWorkFromPartner_artwork$ref } from "./ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql";
import { ArtworkDetailsAdditionalInfo_artwork$ref } from "./ArtworkDetailsAdditionalInfo_artwork.graphql";
import { ArtworkDetailsArticles_artwork$ref } from "./ArtworkDetailsArticles_artwork.graphql";
import { ArtworkDetailsChecklist_artwork$ref } from "./ArtworkDetailsChecklist_artwork.graphql";
declare const _ArtworkDetails_artwork$ref: unique symbol;
export type ArtworkDetails_artwork$ref = typeof _ArtworkDetails_artwork$ref;
export type ArtworkDetails_artwork = {
    readonly articles: ReadonlyArray<({
        readonly id: string;
    }) | null> | null;
    readonly literature: string | null;
    readonly exhibition_history: string | null;
    readonly " $fragmentRefs": ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref & ArtworkDetailsAboutTheWorkFromPartner_artwork$ref & ArtworkDetailsChecklist_artwork$ref & ArtworkDetailsAdditionalInfo_artwork$ref & ArtworkDetailsArticles_artwork$ref;
    readonly " $refType": ArtworkDetails_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML",
    "type": "Format"
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
      "name": "ArtworkDetailsChecklist_artwork",
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
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(size:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10,
          "type": "Int"
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
        },
        v0
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": v1,
      "storageKey": "literature(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "exhibition_history",
      "args": v1,
      "storageKey": "exhibition_history(format:\"HTML\")"
    },
    v0
  ]
};
})();
(node as any).hash = '8518b286a89bd1135f033a2352036f66';
export default node;
