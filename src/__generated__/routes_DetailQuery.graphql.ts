/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_DetailQueryVariables = {};
export type routes_DetailQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Detail_me">;
    } | null;
};
export type routes_DetailQuery = {
    readonly response: routes_DetailQueryResponse;
    readonly variables: routes_DetailQueryVariables;
};



/*
query routes_DetailQuery {
  me {
    ...Detail_me
    id
  }
}

fragment Detail_me on Me {
  conversation(id: "840") {
    internalID
    from {
      name
      id
    }
    initialMessage
    messages(first: 10) {
      ...Messages_messages
    }
    id
  }
}

fragment Message_message on Message {
  internalID
  body
  createdAt
  isFromUser
  from {
    name
    email
  }
}

fragment Messages_messages on MessageConnection {
  edges {
    node {
      ...Message_message
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_DetailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Detail_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_DetailQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conversation",
            "storageKey": "conversation(id:\"840\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "840"
              }
            ],
            "concreteType": "Conversation",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "from",
                "storageKey": null,
                "args": null,
                "concreteType": "ConversationInitiator",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "initialMessage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "messages",
                "storageKey": "messages(first:10)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  }
                ],
                "concreteType": "MessageConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "MessageEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Message",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "body",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "createdAt",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "isFromUser",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "from",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "MessageInitiator",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "email",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          (v2/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_DetailQuery",
    "id": null,
    "text": "query routes_DetailQuery {\n  me {\n    ...Detail_me\n    id\n  }\n}\n\nfragment Detail_me on Me {\n  conversation(id: \"840\") {\n    internalID\n    from {\n      name\n      id\n    }\n    initialMessage\n    messages(first: 10) {\n      ...Messages_messages\n    }\n    id\n  }\n}\n\nfragment Message_message on Message {\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n}\n\nfragment Messages_messages on MessageConnection {\n  edges {\n    node {\n      ...Message_message\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '1b96dfd132b4d913a50292b780e60088';
export default node;
