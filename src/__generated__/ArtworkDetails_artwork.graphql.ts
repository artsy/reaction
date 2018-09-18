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
    readonly additional_information: string | null;
    readonly description: string | null;
    readonly framed: ({
        readonly label: string | null;
    }) | null;
    readonly signatureInfo: ({
        readonly label: string | null;
    }) | null;
    readonly conditionDescription: ({
        readonly label: string | null;
    }) | null;
    readonly certificateOfAuthenticity: ({
        readonly label: string | null;
    }) | null;
    readonly series: string | null;
    readonly publisher: string | null;
    readonly manufacturer: string | null;
    readonly provenance: string | null;
    readonly image_rights: string | null;
    readonly articles: ReadonlyArray<({
        readonly id: string;
    }) | null> | null;
    readonly literature: string | null;
    readonly exhibition_history: string | null;
    readonly " $fragmentRefs": ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref & ArtworkDetailsAboutTheWorkFromPartner_artwork$ref & ArtworkDetailsChecklist_artwork$ref & ArtworkDetailsAdditionalInfo_artwork$ref & ArtworkDetailsArticles_artwork$ref;
    readonly " $refType": ArtworkDetails_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "label",
    "args": null,
    "storageKey": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
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
      "name": "certificateOfAuthenticity",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "additional_information",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "framed",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "signatureInfo",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conditionDescription",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "series",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "publisher",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "manufacturer",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "provenance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "image_rights",
      "args": null,
      "storageKey": null
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
        v1
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "exhibition_history",
      "args": null,
      "storageKey": null
    },
    v1
  ]
};
})();
(node as any).hash = '8028039fe2e0766c0ac41fcb9e3eaa2b';
export default node;
