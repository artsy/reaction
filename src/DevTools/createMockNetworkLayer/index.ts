import { GraphQLFieldResolver, responsePathAsArray } from "graphql"
import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network } from "relay-runtime"
import uuid from "uuid"
import schema from "../../../data/schema.graphql"
import FormattedNumber from "./CustomScalars/formatted_number"

/**
 * @deprecated use createMockNetworkLayer2
 * @param mockResolvers
 */
export const createMockNetworkLayer = (mockResolvers: IMocks) => {
  return Network.create(
    getNetworkLayer({
      schema,
      mocks: { FormattedNumber: () => FormattedNumber, ...mockResolvers },
    })
  )
}

const complain = (info, type) => {
  const path = responsePathAsArray(info.path).join("/")
  const message = `A mock for field at path '${path}' of type '${type}' was expected but not found.`
  throw new Error(message)
}

export const createMockNetworkLayer2 = (
  queryData: object = {},
  mutationData: object = {}
) => {
  const idMap = new WeakMap()
  return Network.create(
    getNetworkLayer({
      fieldResolver: ((source, _args, _context, info) => {
        // source is null for aliased root fields
        source = source || queryData
        if (source) {
          if (info.fieldName in source) {
            return source[info.fieldName]
          }
          const alias = info.fieldNodes[0].alias
          if (alias && alias.value in source) {
            return source[alias.value]
          }

          if (info.fieldName === "__id" || info.fieldName === "id") {
            if ("id" in source) {
              return source.id
            }

            if (idMap.has(source)) {
              return idMap.get(source)
            }

            const id = uuid()
            idMap.set(source, id)
            return id
          }
        }
        complain(info, info.returnType.inspect())
      }) as GraphQLFieldResolver<any, any>,
      schema,
      resolvers: {
        FormattedNumber: () => FormattedNumber,
        Query: Object.entries(queryData).reduce(
          (acc, [k, v]) => ({
            ...acc,
            [k]: typeof v === "function" ? v : () => v,
          }),
          {}
        ),
        Mutation: Object.entries(mutationData).reduce(
          (acc, [k, v]) => ({
            ...acc,
            [k]: typeof v === "function" ? v : () => v,
          }),
          {}
        ),
      },
    })
  )
}
