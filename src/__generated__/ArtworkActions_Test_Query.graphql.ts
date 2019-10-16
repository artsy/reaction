/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkActions_artwork$ref } from "./ArtworkActions_artwork.graphql";
export type ArtworkActions_Test_QueryVariables = {
    readonly artwork_id: string;
};
export type ArtworkActions_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkActions_artwork$ref;
    }) | null;
};
export type ArtworkActions_Test_Query = {
    readonly response: ArtworkActions_Test_QueryResponse;
    readonly variables: ArtworkActions_Test_QueryVariables;
};



/*
query ArtworkActions_Test_Query(
  $artwork_id: String!
) {
  artwork(id: $artwork_id) {
    ...ArtworkActions_artwork
    __id
  }
}

fragment ArtworkActions_artwork on Artwork {
  ...Save_artwork
  ...ArtworkSharePanel_artwork
  artists {
    name
    __id
  }
  date
  dimensions {
    cm
  }
  href
  id
  image {
    id
    url(version: "larger")
    height
    width
    __id: id
  }
  is_downloadable
  is_hangable
  partner {
    id
    __id
  }
  title
  sale {
    is_closed
    is_auction
    __id
  }
  __id
}

fragment Save_artwork on Artwork {
  __id
  _id
  id
  is_saved
  title
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
    __id: id
  }
  artworkMeta: meta {
    share
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artwork_id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artwork_id",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkActions_Test_Query",
  "id": null,
  "text": "query ArtworkActions_Test_Query(\n  $artwork_id: String!\n) {\n  artwork(id: $artwork_id) {\n    ...ArtworkActions_artwork\n    __id\n  }\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...Save_artwork\n  ...ArtworkSharePanel_artwork\n  artists {\n    name\n    __id\n  }\n  date\n  dimensions {\n    cm\n  }\n  href\n  id\n  image {\n    id\n    url(version: \"larger\")\n    height\n    width\n    __id: id\n  }\n  is_downloadable\n  is_hangable\n  partner {\n    id\n    __id\n  }\n  title\n  sale {\n    is_closed\n    is_auction\n    __id\n  }\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n    __id: id\n  }\n  artworkMeta: meta {\n    share\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkActions_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkActions_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkActions_Test_Query",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          },
          v2,
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_saved",
            "args": null,
            "storageKey": null
          },
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
            "name": "href",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              },
              v4
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artworkMeta",
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "share",
                "args": null,
                "storageKey": null
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
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "dimensions",
            "storageKey": null,
            "args": null,
            "concreteType": "dimensions",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cm",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "larger",
                    "type": "[String]"
                  }
                ],
                "storageKey": "url(version:\"larger\")"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "height",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "width",
                "args": null,
                "storageKey": null
              },
              v4
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_downloadable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_hangable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v3,
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_closed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_auction",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '5f70d01485da2ab95a0c7ca4bdd72223';
export default node;
