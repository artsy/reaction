import {
  CreateSmsSecondFactorInput,
  CreateSmsSecondFactorMutation,
  CreateSmsSecondFactorMutationResponse,
} from "__generated__/CreateSmsSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const CreateSmsSecondFactor = (
  environment: Environment,
  input: CreateSmsSecondFactorInput
) => {
  return new Promise<CreateSmsSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<CreateSmsSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation CreateSmsSecondFactorMutation(
            $input: CreateSmsSecondFactorInput!
          ) @raw_response_type {
            createSmsSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SecondFactor {
                  internalID
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
