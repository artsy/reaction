import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { createMockFetchQuery, MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { Network } from "relay-runtime"
import { Breakpoint } from "Utils/Responsive"
import { RootTestPage } from "./RootTestPage"

export function createTestEnv<
  MutationNames extends string,
  TestPage extends RootTestPage
>({
  Component,
  query,
  defaultData,
  defaultMutationResults = {} as Record<MutationNames, any>,
  defaultBreakpoint,
  TestPage,
}: {
  Component: React.ComponentType<any>
  query: GraphQLTaggedNode
  defaultData: object
  defaultMutationResults?: Record<MutationNames, any>
  defaultBreakpoint?: Breakpoint
  TestPage: { new (): TestPage }
}) {
  // surface resolver errors that otherwise get swallowed by
  // onError in the pages' calls to commitMutation
  let errors = []

  const mutationResolvers: Record<MutationNames, jest.Mock> = Object.entries(
    defaultMutationResults
  ).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: jest.fn((...args) => (typeof v === "function" ? v(...args) : v)),
    }),
    {}
  ) as any

  afterEach(() => {
    const _errors = errors
    errors = []
    Object.keys(mutationResolvers).forEach(key =>
      mutationResolvers[key].mockClear()
    )
    if (_errors.length !== 0) {
      throw new Error(_errors as any)
    }
  })

  const mutations = {
    resolvers: mutationResolvers,
    useResultsOnce: (mutationResults: Partial<Record<MutationNames, any>>) => {
      Object.entries(mutationResults).forEach(([k, v]) => {
        if (typeof v === "function") {
          mutationResolvers[k].mockImplementationOnce(v)
        } else {
          mutationResolvers[k].mockReturnValueOnce(v)
        }
      })
    },
  }

  const buildPage = async ({
    mockData,
    mockMutationResults,
    breakpoint,
  }: {
    mockData?: object
    mockMutationResults?: Record<MutationNames, any>
    breakpoint?: Breakpoint
  } = {}): Promise<TestPage> => {
    const page = new TestPage() as TestPage

    if (mockMutationResults) {
      mutations.useResultsOnce(mockMutationResults)
    }

    const fetchQuery = createMockFetchQuery({
      mockData: { ...defaultData, ...mockData },
      mockMutationResults: mutations.resolvers,
    })

    // surface resolver errors from fetchQuery that otherwise get swallowed by
    // error handling in the pages themselves
    const wrappedFetchQuery = (operation, variables) =>
      fetchQuery(operation, variables).catch(e => {
        errors.push(e)
        throw e
      })

    page.mockQueryFetch.mockImplementation(wrappedFetchQuery)
    page.mockMutationFetch.mockImplementation(wrappedFetchQuery)

    // Switch on mutation/query when making requests to help make assertions
    // Seems we only make assertions about mutations right now
    const mockNetwork = Network.create((operation, variableValues) => {
      return operation.operationKind === "mutation"
        ? page.mockMutationFetch(operation, variableValues)
        : page.mockQueryFetch(operation, variableValues)
    })

    // @ts-ignore
    page.root = await renderRelayTree({
      Component: (props: any) => (
        <MockBoot breakpoint={breakpoint || defaultBreakpoint}>
          <Component
            {...props}
            router={{ push: page.mockPushRoute }}
            route={{ onTransition: jest.fn() }}
          />
          <ConnectedModalDialog />
        </MockBoot>
      ),
      query,
      mockNetwork,
    })

    return page as any
  }

  return { buildPage, mutations }
}
