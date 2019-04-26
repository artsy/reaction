/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistBio_bio$ref } from "./ArtistBio_bio.graphql";
import { ArtworkFilter_artist$ref } from "./ArtworkFilter_artist.graphql";
import { CurrentEvent_artist$ref } from "./CurrentEvent_artist.graphql";
import { Genes_artist$ref } from "./Genes_artist.graphql";
import { MarketInsights_artist$ref } from "./MarketInsights_artist.graphql";
import { SelectedCareerAchievements_artist$ref } from "./SelectedCareerAchievements_artist.graphql";
declare const _Overview_artist$ref: unique symbol;
export type Overview_artist$ref = typeof _Overview_artist$ref;
export type Overview_artist = {
    readonly id: string;
    readonly counts: ({
        readonly partner_shows: any | null;
    }) | null;
    readonly href: string | null;
    readonly is_consignable: boolean | null;
    readonly biography_blurb: ({
        readonly text: string | null;
        readonly credit: string | null;
    }) | null;
    readonly currentEvent: ({
        readonly name: string | null;
    }) | null;
    readonly related: ({
        readonly genes: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly artists: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __id: string;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly _id: string;
    readonly collections: ReadonlyArray<string | null> | null;
    readonly highlights: ({
        readonly partners: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly categories: ReadonlyArray<({
                        readonly id: string;
                    }) | null> | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly insights: ReadonlyArray<({
        readonly type: string | null;
    }) | null> | null;
    readonly " $fragmentRefs": ArtistBio_bio$ref & CurrentEvent_artist$ref & MarketInsights_artist$ref & SelectedCareerAchievements_artist$ref & Genes_artist$ref & ArtworkFilter_artist$ref;
    readonly " $refType": Overview_artist$ref;
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
  "name": "Overview_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "major_periods",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "partner_id",
      "type": "ID!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "for_sale",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "at_auction",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "inquireable_only",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String",
      "defaultValue": "-decayed_merch"
    },
    {
      "kind": "LocalArgument",
      "name": "partner_category",
      "type": "[String]",
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ]
    },
    {
      "kind": "LocalArgument",
      "name": "price_range",
      "type": "String",
      "defaultValue": "*-*"
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_consignable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistBio_bio",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "MarketInsights_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Genes_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkFilter_artist",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "at_auction",
          "variableName": "at_auction",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "inquireable_only",
          "variableName": "inquireable_only",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "major_periods",
          "variableName": "major_periods",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "partner_id",
          "variableName": "partner_id",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "price_range",
          "variableName": "price_range",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": null
        }
      ]
    },
    v0,
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "partner_shows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CurrentEvent_artist",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "biography_blurb",
      "storageKey": "biography_blurb(format:\"HTML\",partner_bio:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML",
          "type": "Format"
        },
        {
          "kind": "Literal",
          "name": "partner_bio",
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "ArtistBlurb",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "text",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "credit",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "currentEvent",
      "storageKey": null,
      "args": null,
      "concreteType": "CurrentEvent",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "genes",
          "storageKey": null,
          "args": null,
          "concreteType": "GeneConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "GeneEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Gene",
                  "plural": false,
                  "selections": [
                    v0,
                    v1
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artists",
          "storageKey": "artists(first:1)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1,
              "type": "Int"
            }
          ],
          "concreteType": "ArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    v1
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "collections",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "highlights",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistHighlights",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "partners",
          "storageKey": null,
          "args": [
            {
              "kind": "Literal",
              "name": "display_on_partner_profile",
              "value": true,
              "type": "Boolean"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 10,
              "type": "Int"
            },
            {
              "kind": "Variable",
              "name": "partner_category",
              "variableName": "partner_category",
              "type": "[String]"
            },
            {
              "kind": "Literal",
              "name": "represented_by",
              "value": true,
              "type": "Boolean"
            }
          ],
          "concreteType": "PartnerArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "PartnerArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Partner",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "categories",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Category",
                      "plural": true,
                      "selections": [
                        v0
                      ]
                    },
                    v1
                  ]
                },
                v1
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "insights",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistInsight",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '339edc6a36659de47dce68de5dc5d6d8';
export default node;
