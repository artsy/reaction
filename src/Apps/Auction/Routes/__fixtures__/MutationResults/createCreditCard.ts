import { RegisterCreateCreditCardMutationResponse } from "__generated__/RegisterCreateCreditCardMutation.graphql"

export const createCreditCardSuccessful: RegisterCreateCreditCardMutationResponse = {
  createCreditCard: {
    creditCardOrError: {
      creditCardEdge: {
        node: {
          last_digits: "4242",
        },
      },
    },
  },
}

export const createCreditCardFailed: RegisterCreateCreditCardMutationResponse = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        message: "The `createCreditCard` mutation failed.",
        type: "",
        detail: "",
      },
    },
  },
}
