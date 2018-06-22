/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type AuctionResultsRefetchContainer_artist = {
    readonly id: string;
    readonly auctionResults: ({
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
            readonly endCursor: string | null;
        };
        readonly pageCursors: ({
            readonly around: ReadonlyArray<{
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }>;
            readonly first: ({
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }) | null;
            readonly last: ({
                readonly cursor: string;
                readonly page: number;
                readonly isCurrent: boolean;
            }) | null;
        }) | null;
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly title: string | null;
                readonly dimension_text: string | null;
                readonly organization: string | null;
                readonly images: ({
                    readonly thumbnail: ({
                        readonly url: string | null;
                    }) | null;
                }) | null;
                readonly description: string | null;
                readonly date_text: string | null;
                readonly sale_date_text: string | null;
                readonly price_realized: ({
                    readonly display: string | null;
                    readonly cents_usd: number | null;
                }) | null;
                readonly estimate: ({
                    readonly display: string | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "AuctionResultsRefetchContainer_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "AuctionResultSorts",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "auctionResults",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": "AuctionResultSorts"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasPreviousPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageCursors",
          "storageKey": null,
          "args": null,
          "concreteType": "PageCursors",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "around",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": true,
              "selections": v0
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "first",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": false,
              "selections": v0
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "last",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursor",
              "plural": false,
              "selections": v0
            }
          ]
        },
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
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "dimension_text",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "organization",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "images",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionLotImages",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "thumbnail",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "url",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
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
                  "name": "date_text",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "sale_date_text",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "price_realized",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionResultPriceRealized",
                  "plural": false,
                  "selections": [
                    v1,
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "cents_usd",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "estimate",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionLotEstimate",
                  "plural": false,
                  "selections": [
                    v1
                  ]
                },
                v2
              ]
            }
          ]
        }
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '1c84a096a6328c41638386cc66f5f869';
export default node;
