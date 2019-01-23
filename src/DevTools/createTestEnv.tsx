import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { createMockFetchQuery, MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { Network } from "relay-runtime"
import { Breakpoint } from "Utils/Responsive"
import { RootTestPage } from "./RootTestPage"

interface MutationMocks<Types extends string> {
  resolvers: { [k in Types]: jest.Mock }
  useResultsOnce(args: Partial<{ [k in Types]: any }>): void
}

interface TestEnvOptions<
  Mutations extends string,
  TestPage extends RootTestPage
> {
  Component: React.ComponentType<any>
  query: GraphQLTaggedNode
  defaultData: object
  TestPage: { new (): TestPage }
  defaultMutationResults?: Record<Mutations, any>
  defaultBreakpoint?: Breakpoint
}

class TestEnv<Mutations extends string, TestPage extends RootTestPage> {
  constructor(
    private opts: TestEnvOptions<Mutations, TestPage>,
    public readonly mutations: MutationMocks<Mutations>
  ) {
    this.opts = opts
    this.mutations = mutations
  }

  readonly errors = []

  async buildPage({
    mockData,
    mockMutationResults,
    breakpoint,
  }: {
    mockData?: object
    mockMutationResults?: Record<Mutations, any>
    breakpoint?: Breakpoint
  } = {}): Promise<TestPage> {
    const {
      Component,
      // tslint:disable-next-line:no-shadowed-variable
      TestPage,
      defaultBreakpoint,
      defaultData,
      query,
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
  Mutations extends string,
  TestPage extends RootTestPage
>({
  defaultMutationResults = {} as Record<Mutations, any>,
  ...opts
}: TestEnvOptions<Mutations, TestPage>): TestEnv<Mutations, TestPage> {
  // surface resolver errors that otherwise get swallowed by
  // onError in the pages' calls to commitMutation
  let errors = []

  const mutationResolvers: Record<Mutations, jest.Mock> = Object.entries({
    ...defaultMutationResults,
  }).reduce(
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

  const mutations: MutationMocks<Mutations> = {
    resolvers: mutationResolvers as any,
    useResultsOnce: mutationResults => {
      Object.entries(mutationResults).forEach(([k, v]) => {
        if (typeof v === "function") {
          mutationResolvers[k].mockImplementationOnce(v)
        } else {
          mutationResolvers[k].mockReturnValueOnce(v)
        }
      })
    },
  }

  return new TestEnv(opts, mutations)
}
