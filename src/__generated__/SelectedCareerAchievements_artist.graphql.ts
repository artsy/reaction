/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _SelectedCareerAchievements_artist$ref: unique symbol;
export type SelectedCareerAchievements_artist$ref = typeof _SelectedCareerAchievements_artist$ref;
export type SelectedCareerAchievements_artist = {
    readonly _id: string;
    readonly highlights: {
        readonly partners: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly categories: ReadonlyArray<{
                        readonly id: string;
                    } | null> | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly insights: ReadonlyArray<{
        readonly type: string | null;
        readonly label: string | null;
        readonly entities: ReadonlyArray<string | null> | null;
    } | null> | null;
    readonly auctionResults: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly price_realized: {
                    readonly display: string | null;
                } | null;
                readonly organization: string | null;
                readonly sale_date: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": SelectedCareerAchievements_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SelectedCareerAchievements_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "partner_category",
      "type": "[String]",
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ]
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
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
              "value": true
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            },
            {
              "kind": "Variable",
              "name": "partner_category",
              "variableName": "partner_category"
            },
            {
              "kind": "Literal",
              "name": "represented_by",
              "value": true
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
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "id",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
                }
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "label",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "entities",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "auctionResults",
      "storageKey": "auctionResults(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "recordsTrusted",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PRICE_AND_DATE_DESC"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "AuctionResultEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "AuctionResult",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "price_realized",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionResultPriceRealized",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "display",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "0a"
                        }
                      ],
                      "storageKey": "display(format:\"0a\")"
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "organization",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "sale_date",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "storageKey": "sale_date(format:\"YYYY\")"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '87b6c981376c85f3657f9b6e6fd372c5';
export default node;
