import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const settingOrderShipmentFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "Not permitted",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "missing_region",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "missing_country",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentSuccess = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}
