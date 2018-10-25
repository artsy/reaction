import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import schema from "../../../data/schema.json"
import FormattedNumber from "./CustomScalars/formatted_number"

export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  return Network.create(
    getNetworkLayer({
      schema,
      mocks: { FormattedNumber: () => FormattedNumber, ...mockResolvers },
    })
  )
}
