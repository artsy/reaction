import { IResolvers } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import schema from "../../data/schema.json"

export const createMockNetworkLayer = (mockResolvers: IResolvers) => {
  return Network.create(
    getNetworkLayer({
      schema,
      mocks: mockResolvers,
    })
  )
}
