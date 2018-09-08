import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import schemaDSL from "../../../data/schema.graphql"

export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  console.log(">>>>")
  console.log(schemaDSL)
  console.log(">>>>")
  const schemaObj = { data: schemaDSL }
  return Network.create(
    getNetworkLayer({
      schemaObj,
      mocks: mockResolvers,
    })
  )
}
