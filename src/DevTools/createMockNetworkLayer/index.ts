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
      fieldResolver: ((source, _args, _context, info) => {
        if (source) {
          if (info.fieldName in source) {
            return source[info.fieldName]
          }
          const alias = info.fieldNodes[0].alias
          if (alias && alias.value in source) {
            return source[alias.value]
          }
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
