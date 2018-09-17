export const creatingCreditCardSuccess = {
  createCreditCard: {
    creditCardOrError: {
      creditCard: {
        id: "gravityCreditCardId",
      },
    },
  },
}

export const creatingCreditCardFailed = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        type: "other_error",
        message: "No such token: fake-token",
        detail: null,
        error: null,
      },
    },
  },
}
