import {
  DisableSecondFactorInput,
  DisableSecondFactorMutation,
  DisableSecondFactorMutationResponse,
} from "__generated__/DisableSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const DisableSecondFactor = (
  environment: Environment,
  input: DisableSecondFactorInput
) => {
  return new Promise<DisableSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<DisableSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation DisableSecondFactorMutation(
            $input: DisableSecondFactorInput!
          ) @raw_response_type {
            disableSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SecondFactor {
                  __typename
                }

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
