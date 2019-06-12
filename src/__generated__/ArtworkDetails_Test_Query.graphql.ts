/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkDetails_artwork$ref } from "./ArtworkDetails_artwork.graphql";
export type ArtworkDetails_Test_QueryVariables = {};
export type ArtworkDetails_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": ArtworkDetails_artwork$ref;
    } | null;
};
export type ArtworkDetails_Test_Query = {
    readonly response: ArtworkDetails_Test_QueryResponse;
    readonly variables: ArtworkDetails_Test_QueryVariables;
};



/*
query ArtworkDetails_Test_Query {
  artwork(id: "richard-prince-untitled-fashion") {
    ...ArtworkDetails_artwork
    id
  }
}

fragment ArtworkDetails_artwork on Artwork {
  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
  ...ArtworkDetailsAboutTheWorkFromPartner_artwork
  ...ArtworkDetailsAdditionalInfo_artwork
  ...ArtworkDetailsArticles_artwork
  articles(size: 10) {
    id
  }
  literature(format: HTML)
  exhibition_history(format: HTML)
  provenance(format: HTML)
}

fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
  description(format: HTML)
}

fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
  additional_information(format: HTML)
  sale {
    isBenefit
    isGalleryAuction
    id
  }
  partner {
    _id
    id
    type
    href
    name
    initials
    locations {
      city
      id
    }
    is_default_profile_public
    profile {
      ...FollowProfileButton_profile
      id
      icon {
        url(version: "square140")
        id
      }
    }
  }
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  series
  publisher
  manufacturer
  image_rights
  framed {
    label
    details
  }
  signatureInfo {
    label
    details
  }
  conditionDescription {
    label
    details
  }
  certificateOfAuthenticity {
    label
    details
  }
}

fragment ArtworkDetailsArticles_artwork on Artwork {
  articles(size: 10) {
    author {
      name
      id
    }
    href
    published_at(format: "MMM Do, YYYY")
    thumbnail_image {
      resized(width: 300) {
        url
      }
      id
    }
    thumbnail_title
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  __id
  id
  is_followed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-prince-untitled-fashion"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
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
    "name": "details",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkDetails_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-prince-untitled-fashion\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkDetails_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-prince-untitled-fashion\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": (v1/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "additional_information",
            "args": (v1/*: any*/),
            "storageKey": "additional_information(format:\"HTML\")"
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
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isGalleryAuction",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "_id",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "type",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "initials",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_default_profile_public",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "profile",
                "storageKey": null,
                "args": null,
                "concreteType": "Profile",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__id",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_followed",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "icon",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square140"
                          }
                        ],
                        "storageKey": "url(version:\"square140\")"
                      },
                      (v2/*: any*/)
                    ]
                  }
                ]
              }
            ]
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
            "name": "image_rights",
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
            "selections": (v5/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "signatureInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v5/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conditionDescription",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v5/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "certificateOfAuthenticity",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v5/*: any*/)
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
                "value": 10
              }
            ],
            "concreteType": "Article",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "author",
                "storageKey": null,
                "args": null,
                "concreteType": "Author",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/)
                ]
              },
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "published_at",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "storageKey": "published_at(format:\"MMM Do, YYYY\")"
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
                        "value": 300
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
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "thumbnail_title",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "literature",
            "args": (v1/*: any*/),
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "exhibition_history",
            "args": (v1/*: any*/),
            "storageKey": "exhibition_history(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "provenance",
            "args": (v1/*: any*/),
            "storageKey": "provenance(format:\"HTML\")"
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkDetails_Test_Query",
    "id": null,
    "text": "query ArtworkDetails_Test_Query {\n  artwork(id: \"richard-prince-untitled-fashion\") {\n    ...ArtworkDetails_artwork\n    id\n  }\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  ...ArtworkDetailsArticles_artwork\n  articles(size: 10) {\n    id\n  }\n  literature(format: HTML)\n  exhibition_history(format: HTML)\n  provenance(format: HTML)\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  description(format: HTML)\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additional_information(format: HTML)\n  sale {\n    isBenefit\n    isGalleryAuction\n    id\n  }\n  partner {\n    _id\n    id\n    type\n    href\n    name\n    initials\n    locations {\n      city\n      id\n    }\n    is_default_profile_public\n    profile {\n      ...FollowProfileButton_profile\n      id\n      icon {\n        url(version: \"square140\")\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  series\n  publisher\n  manufacturer\n  image_rights\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    author {\n      name\n      id\n    }\n    href\n    published_at(format: \"MMM Do, YYYY\")\n    thumbnail_image {\n      resized(width: 300) {\n        url\n      }\n      id\n    }\n    thumbnail_title\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  __id\n  id\n  is_followed\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '47b762aa1966b2d44edfe7bdeee831bf';
export default node;
