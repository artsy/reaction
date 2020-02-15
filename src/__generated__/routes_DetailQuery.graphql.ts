/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_DetailQueryVariables = {
    conversationID: string;
};
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
query routes_DetailQuery(
  $conversationID: String!
) {
  me {
    ...Detail_me_3oGfhn
    id
  }
}

fragment Conversation_conversation on Conversation {
  id
  internalID
  from {
    name
    email
    id
  }
  initialMessage
  lastMessageID
  messages(first: 10) {
    edges {
      node {
        id
        internalID
        ...Message_message
      }
    }
  }
}

fragment Detail_me_3oGfhn on Me {
  conversation(id: $conversationID) {
    ...Conversation_conversation
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "conversationID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
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
    "argumentDefinitions": (v0/*: any*/),
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
            "args": [
              {
                "kind": "Variable",
                "name": "conversationID",
                "variableName": "conversationID"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_DetailQuery",
    "argumentDefinitions": (v0/*: any*/),
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
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "conversationID"
              }
            ],
            "concreteType": "Conversation",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "from",
                "storageKey": null,
                "args": null,
                "concreteType": "ConversationInitiator",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v1/*: any*/)
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
                "kind": "ScalarField",
                "alias": null,
                "name": "lastMessageID",
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
                          (v1/*: any*/),
                          (v2/*: any*/),
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
                              (v3/*: any*/),
                              (v4/*: any*/)
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
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_DetailQuery",
    "id": null,
    "text": "query routes_DetailQuery(\n  $conversationID: String!\n) {\n  me {\n    ...Detail_me_3oGfhn\n    id\n  }\n}\n\nfragment Conversation_conversation on Conversation {\n  id\n  internalID\n  from {\n    name\n    email\n    id\n  }\n  initialMessage\n  lastMessageID\n  messages(first: 10) {\n    edges {\n      node {\n        id\n        internalID\n        ...Message_message\n      }\n    }\n  }\n}\n\nfragment Detail_me_3oGfhn on Me {\n  conversation(id: $conversationID) {\n    ...Conversation_conversation\n    id\n  }\n}\n\nfragment Message_message on Message {\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7a86aa6acf364335ea5874519b2a6389';
export default node;
