export const creatingCreditCardSuccess = {
  createCreditCard: {
    creditCardOrError: {
      __typename: "CreditCardMutationSuccess",
      creditCard: {
        id: "gravityCreditCardId",
      },
    },
  },
}

export const creatingCreditCardFailed = {
  createCreditCard: {
    creditCardOrError: {
      __typename: "CreditCardMutationFailure",
      mutationError: {
        type: "payment_error",
        message: "Payment error",
        detail: "No such token: fake-token",
        error: null,
      },
    },
  },
}
