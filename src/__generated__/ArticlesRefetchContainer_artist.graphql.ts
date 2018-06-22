/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArticlesRefetchContainer_artist = {
    readonly id: string;
    readonly articlesConnection: ({
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
                readonly href: string | null;
                readonly thumbnail_title: string | null;
                readonly author: ({
                    readonly name: string | null;
                }) | null;
                readonly published_at: string | null;
                readonly thumbnail_image: ({
                    readonly resized: ({
                        readonly url: string | null;
                    }) | null;
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
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArticlesRefetchContainer_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
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
      "name": "articlesConnection",
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
          "kind": "Literal",
          "name": "in_editorial_feed",
          "value": true,
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last",
          "type": "Int"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC",
          "type": "ArticleSorts"
        }
      ],
      "concreteType": "ArticleConnection",
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
          "concreteType": "ArticleEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Article",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "href",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "thumbnail_title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "author",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Author",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
                      "args": null,
                      "storageKey": null
                    },
                    v1
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "published_at",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM d, YYYY",
                      "type": "String"
                    }
                  ],
                  "storageKey": "published_at(format:\"MMM d, YYYY\")"
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "thumbnail_image",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "resized",
                      "storageKey": "resized(width:300)",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 300,
                          "type": "Int"
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
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
                v1
              ]
            }
          ]
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '2ddf84ba25012ea4761a56dd723d2f7f';
export default node;
