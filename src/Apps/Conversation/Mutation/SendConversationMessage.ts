import { Conversation_conversation } from "__generated__/Conversation_conversation.graphql"
import { SendConversationMessageMutation } from "__generated__/SendConversationMessageMutation.graphql"
import {
  commitMutation,
  Environment,
  graphql,
  MutationConfig,
} from "relay-runtime"

export const SendConversationMessage = (
  environment: Environment,
  conversation: Conversation_conversation,
  text: string,
  onCompleted: MutationConfig<any>["onCompleted"],
  onError: MutationConfig<any>["onError"]
) => {
  return commitMutation<SendConversationMessageMutation>(environment, {
    onError,
    onCompleted,
    variables: {
      input: {
        id: conversation.internalID,
        from: conversation.from.email,
        bodyText: text,
        // Reply to the last message
        replyToMessageID: conversation.lastMessageID,
      },
    },
    mutation: graphql`
      mutation SendConversationMessageMutation(
        $input: SendConversationMessageMutationInput!
      ) {
        sendConversationMessage(input: $input) {
          messageEdge {
            node {
              impulseID
              isFromUser
              body
              id
              ...Message_message
            }
          }
        }
      }
    `,
  })
}
