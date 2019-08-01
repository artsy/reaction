import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const settingOrderShipmentFailure = {
  commerceSetOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "Not permitted",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  commerceSetOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_region",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  commerceSetOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_country",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentSuccess = {
  commerceSetOrderShipping: {
    orderOrError: {
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}
