import {
  DeliverSecondFactorInput,
  DeliverSecondFactorMutation,
  DeliverSecondFactorMutationResponse,
} from "__generated__/DeliverSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const DeliverSecondFactor = (
  environment: Environment,
  input: DeliverSecondFactorInput
) => {
  return new Promise<DeliverSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<DeliverSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation DeliverSecondFactorMutation(
            $input: DeliverSecondFactorInput!
          ) @raw_response_type {
            deliverSecondFactor(input: $input) {
              secondFactorOrErrors {
                __typename

                ... on Errors {
                  errors {
                    message
                    code
                    path
                    data
                  }
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}
