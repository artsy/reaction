import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { createMockFetchQuery, MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { Network } from "relay-runtime"
import { Breakpoint } from "Utils/Responsive"
import { RootTestPage } from "./RootTestPage"

class Mutations<MutationNames extends string> {
  constructor(public resolvers: Record<MutationNames, jest.Mock>) {
    this.resolvers = resolvers
  }
  useResultsOnce = (mutationResults: Partial<Record<MutationNames, any>>) => {
    Object.entries(mutationResults).forEach(([k, v]) => {
      if (typeof v === "function") {
        this.resolvers[k].mockImplementationOnce(v)
      } else {
        this.resolvers[k].mockReturnValueOnce(v)
      }
    })
  }
}

class TestEnv<MutationNames extends string, TestPage extends RootTestPage> {
  constructor(
    private opts: {
      Component: React.ComponentType<any>
      query: GraphQLTaggedNode
      defaultData: object
      defaultMutationResults?: Record<MutationNames, any>
      defaultBreakpoint?: Breakpoint
      TestPage: { new (): TestPage }
    }
  ) {
    this.opts = opts

    const mutationResolvers: Record<MutationNames, jest.Mock> = Object.entries(
      opts.defaultMutationResults
    ).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: jest.fn((...args) => (typeof v === "function" ? v(...args) : v)),
      }),
      {} as any
    )

    afterEach(() => {
      const _errors = this.errors
      this.errors = []
      Object.keys(mutationResolvers).forEach(key =>
        mutationResolvers[key].mockClear()
      )
      if (_errors.length !== 0) {
        throw new Error(_errors as any)
      }
    })

    this.mutations = new Mutations(mutationResolvers)
  }

  mutations: Mutations<MutationNames>

  private errors: any[] = []

  buildPage = async ({
    mockData,
    mockMutationResults,
    breakpoint,
  }: {
    mockData?: object
    mockMutationResults?: Record<MutationNames, any>
    breakpoint?: Breakpoint
  } = {}): Promise<TestPage> => {
    const {
      Component,
      // tslint:disable-next-line:no-shadowed-variable
      TestPage,
      query,
      defaultData,
      defaultBreakpoint,
    } = this.opts
    const page = new TestPage() as TestPage

    if (mockMutationResults) {
      this.mutations.useResultsOnce(mockMutationResults)
    }

    const fetchQuery = createMockFetchQuery({
      mockData: { ...defaultData, ...mockData },
      mockMutationResults: this.mutations.resolvers,
    })

    // surface resolver errors from fetchQuery that otherwise get swallowed by
    // error handling in the pages themselves
    const wrappedFetchQuery = (operation, variables) =>
      fetchQuery(operation, variables).catch(e => {
        this.errors.push(e)
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
}

export function createTestEnv<
  MutationNames extends string,
  TestPage extends RootTestPage
>(opts: TestEnv<MutationNames, TestPage>["opts"]) {
  return new TestEnv(opts)
}
