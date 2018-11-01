export const initialOfferSuccess = {
  ecommerceSetOrderPayment: {
    orderOrError: {
      order: {
        id: "1234",
        offerTotalCents: 400,
        lastOffer: {
          id: "2345",
          amountCents: 400,
        },
      },
    },
  },
}

export const initialOfferFailed = {
  ecommerceSetOrderPayment: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_offer",
        data: null,
      },
    },
  },
}
