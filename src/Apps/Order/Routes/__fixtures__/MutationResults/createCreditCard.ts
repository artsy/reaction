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
        type: "payment_error",
        message: "Payment error",
        detail: "No such token: fake-token",
        error: null,
      },
    },
  },
}
