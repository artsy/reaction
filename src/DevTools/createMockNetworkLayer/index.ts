import { GraphQLFieldResolver, responsePathAsArray } from "graphql"
import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import schema from "../../../data/schema.graphql"
import FormattedNumber from "./CustomScalars/formatted_number"

const complain = (info, type) => {
  const path = responsePathAsArray(info.path).join("/")
  const message = `A mock for ${type} field was expected but not found at path ${path}`
  console.error(message)
  throw new Error(message)
}

export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  return Network.create(
    getNetworkLayer({
      schema,
      mocks: {
        FormattedNumber: () => FormattedNumber,
        String: ((_source, _args, _context, info) => {
          complain(info, "String")
        }) as GraphQLFieldResolver<any, any>,
        Int: ((_source, _args, _context, info) => {
          complain(info, "Int")
        }) as GraphQLFieldResolver<any, any>,
        Float: ((_source, _args, _context, info) => {
          complain(info, "Float")
        }) as GraphQLFieldResolver<any, any>,
        Boolean: ((_source, _args, _context, info) => {
          complain(info, "Boolean")
        }) as GraphQLFieldResolver<any, any>,
        ...mockResolvers,
      },
    })
  )
}
