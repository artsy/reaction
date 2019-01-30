import {
  GraphQLFieldResolver,
  GraphQLResolveInfo,
  isAbstractType,
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

export const createMockNetworkLayer2 = ({
  mockData = {},
  mockMutationResults = {},
}: {
  mockData?: object
  mockMutationResults?: object
}): RelayNetwork => {
  return Network.create(createMockFetchQuery({ mockData, mockMutationResults }))
}

/**
 * Here we create a mock for the `fetchQuery` graphql helper which executes
 * a query. The mock is injected with fake results.
 * @param param0
 */
export const createMockFetchQuery = ({
  mockData = {},
  mockMutationResults = {},
}: {
  mockData?: object
  mockMutationResults?: object
}) => {
  const idMap = new WeakMap()
  // getNetworkLayer is quite poorly named. It's actually returning a
  // `fetchQuery` function
  return getNetworkLayer({
    // We pass this field resolver in so that we can control the resolution
    // logic for all data that relay tries to extract from our mock fixtures.
    fieldResolver: ((source, _args, _context, info) => {
      // source is null for root fields
      source =
        source ||
        (info.operation.operation === "mutation"
          ? mockMutationResults
          : mockData)

      // handle aliased fields first
      const alias = info.fieldNodes[0].alias
      if (alias && alias.value in source) {
        return inferUnionOrInterfaceType(source[alias.value], info)
      }

      // the common case, the field has a fixture and is not aliased
      if (info.fieldName in source) {
        return inferUnionOrInterfaceType(source[info.fieldName], info)
      }

      if (info.fieldName === "__id" || info.fieldName === "id") {
        // if relay is looking for `__id` but we only supplied `id`
        if ("id" in source) {
          return source.id
        }

        // relay is looking for an id to denormalize the fixture in the store
        // but we don't want to have to specify ids for all fixtures
        // so generate one and store it in a weak map so we don't mutate
        // the object itself
        if (idMap.has(source)) {
          return idMap.get(source)
        }

        const id = uuid()
        idMap.set(source, id)
        return id
      }
      complain(info, info.returnType.inspect())
    }) as GraphQLFieldResolver<any, any>,
    schema,
    resolvers: {
      FormattedNumber: () => FormattedNumber,
      // here we map the mock fixture entries to resolver functions if they aren't
      // already. graphql-tools expects functions, but we want to be able to just
      // supply plain data for syntax convenience.
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

// This function tries to infer the concrete type of a value that appears
// in a position whose type is either a union or an interface
const inferUnionOrInterfaceType = (
  value: unknown,
  info: GraphQLResolveInfo
) => {
  const returnType = info.returnType

  if (!isAbstractType(returnType)) {
    return value
  }

  if (value === null || typeof value !== "object" || "__typename" in value) {
    return value
  }

  const unionMemberTypes = info.schema.getPossibleTypes(returnType)

  // TODO: handle nested unions and look at other types

  // try to find keys in the object which are unique to one type
  for (const key of Object.keys(value)) {
    const matchingTypes = unionMemberTypes.filter(type => type.getFields()[key])
    if (matchingTypes.length === 1) {
      return { ...value, __typename: matchingTypes[0].name }
    }
  }

  // failed to find unique keys so the object is ambiguous and we need to ask for a __typename
  const path = responsePathAsArray(info.path).join("/")
  const message = `Ambiguous object at path '${path}'. Add a __typename from this list: [${unionMemberTypes
    .map(type => type.name)
    .join(", ")}]`
  throw new Error(message)
}

const complain = (info: GraphQLResolveInfo, type: string) => {
  const path = responsePathAsArray(info.path).join("/")
  const message = `A mock for field at path '${path}' of type '${type}' was expected but not found.`
  throw new Error(message)
}
