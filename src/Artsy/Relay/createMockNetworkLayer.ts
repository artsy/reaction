import { readFileSync } from "fs"
import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"

// TODO: This doesn't work in client side rendering
const schemaDSL = readFileSync("data/schema.graphql", "utf8")

export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  const schemaObj = { data: schemaDSL }
  return Network.create(
    getNetworkLayer({
      schemaObj,
      mocks: mockResolvers,
    })
  )
}
