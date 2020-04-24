import {
  EnableSecondFactorInput,
  EnableSecondFactorMutation,
  EnableSecondFactorMutationResponse,
} from "__generated__/EnableSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const EnableSecondFactor = (
  environment: Environment,
  input: EnableSecondFactorInput
) => {
  return new Promise<EnableSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<EnableSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation EnableSecondFactorMutation($input: EnableSecondFactorInput!)
            @raw_response_type {
            enableSecondFactor(input: $input) {
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
