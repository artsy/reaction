import { GraphQLFieldResolver, responsePathAsArray } from "graphql"
import { IResolvers } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import schema from "../../../data/schema.graphql"
import FormattedNumber from "./CustomScalars/formatted_number"

const complain = (info, type) => {
  const path = responsePathAsArray(info.path).join("/")
  const message = `A mock for field at path '${path}' of type '${type}' was expected but not found.`
  console.error(message)
  throw new Error(message)
}

export const createMockNetworkLayer = (mockResolvers: IResolvers) => {
  return Network.create(
    getNetworkLayer({
      fieldResolver: ((_source, _args, _context, info) => {
        if (_source && info.fieldName in _source) {
          return _source[info.fieldName]
        }
        complain(info, info.returnType.inspect())
      }) as GraphQLFieldResolver<any, any>,
      schema,
      resolvers: {
        FormattedNumber: () => FormattedNumber,
        ...mockResolvers,
      },
    })
  )
}
