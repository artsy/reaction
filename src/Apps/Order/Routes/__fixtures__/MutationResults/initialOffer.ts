export const initialOfferSuccess = {
  ecommerceInitialOffer: {
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

export const initialOfferFailedCannotOffer = {
  ecommerceInitialOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cant_offer",
        data: null,
      },
    },
  },
}
