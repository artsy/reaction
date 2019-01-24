import {
  GraphQLFieldResolver,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLUnionType,
  responsePathAsArray,
} from "graphql"
import { IMocks } from "graphql-tools/dist/Interfaces"
import getNetworkLayer from "relay-mock-network-layer"
import { Network, RelayNetwork } from "relay-runtime"
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

const inferUnionOrInterfaceType = (value, info) => {
  if (
    !(info.returnType instanceof GraphQLUnionType) &&
    !(info.returnType instanceof GraphQLInterfaceType)
  ) {
    return value
  }
  if (!value || value.__typename || typeof value !== "object") {
    return value
  }

  const unionMemberTypes =
    info.returnType instanceof GraphQLInterfaceType
      ? info.schema._implementations[info.returnType.name]
      : (info.returnType._types.filter(
          type => type instanceof GraphQLObjectType
        ) as GraphQLObjectType[])

  // TODO: handle nested unions and look at other types
  // try to find unique properties for each type
  for (const key of Object.keys(value)) {
    const matchingTypes = unionMemberTypes.filter(type => type.getFields()[key])
    if (matchingTypes.length === 1) {
      return { ...value, __typename: matchingTypes[0].name }
    }
  }

  const path = responsePathAsArray(info.path).join("/")
  const message = `Abmiguous object at path '${path}'. Add a __typename from this list: [${unionMemberTypes
    .map(type => type.name)
    .join(", ")}]`
  throw new Error(message)
}

export const createMockFetchQuery = ({
  mockData = {},
  mockMutationResults = {},
}: {
  mockData?: object
  mockMutationResults?: object
}) => {
  const idMap = new WeakMap()
  return getNetworkLayer({
    fieldResolver: ((source, _args, _context, info) => {
      // source is null for aliased root fields
      source =
        source ||
        (info.operation.operation === "mutation"
          ? mockMutationResults
          : mockData)
      if (source) {
        if (info.fieldName in source) {
          return inferUnionOrInterfaceType(source[info.fieldName], info)
        }
        const alias = info.fieldNodes[0].alias
        if (alias && alias.value in source) {
          return inferUnionOrInterfaceType(source[alias.value], info)
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
      Query: Object.entries(mockData).reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: typeof v === "function" ? v : () => v,
        }),
        {}
      ),
      Mutation: Object.entries(mockMutationResults).reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: typeof v === "function" ? v : () => v,
        }),
        {}
      ),
    },
  })
}

export const createMockNetworkLayer2 = ({
  mockData = {},
  mockMutationResults = {},
}: {
  mockData?: object
  mockMutationResults?: object
}): RelayNetwork => {
  return Network.create(createMockFetchQuery({ mockData, mockMutationResults }))
}
