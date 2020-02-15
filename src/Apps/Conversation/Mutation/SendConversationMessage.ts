import { SendConversationMessageMutation } from "__generated__/SendConversationMessageMutation.graphql"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import { graphql } from "relay-runtime"

export const SendConversationMessage = (
  commitMutation: CommitMutation,
  variables: SendConversationMessageMutation["variables"]
) => {
  return commitMutation<SendConversationMessageMutation>({
    variables,
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
