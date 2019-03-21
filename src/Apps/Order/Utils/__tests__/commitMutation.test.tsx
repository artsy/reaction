import { commitMutationTest1Mutation } from "__generated__/commitMutationTest1Mutation.graphql"
import { settingOrderPaymentFailed } from "Apps/Order/Routes/__fixtures__/MutationResults"
import { ContextProvider } from "Artsy"
import { createMockNetworkLayer2 } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { CommitMutation, injectCommitMutation } from "../commitMutation"
jest.unmock("react-relay")

describe(injectCommitMutation, () => {
  const network = createMockNetworkLayer2({
    mockMutationResults: {
      ...settingOrderPaymentFailed,
    },
  })
  const source = new RecordSource()
  const store = new Store(source)
  const relayEnvironment = new Environment({
    network,
    store,
  })

  const Provider: React.FC = props => (
    <ContextProvider relayEnvironment={relayEnvironment}>
      {props.children}
    </ContextProvider>
  )

  it("injects two props", () => {
    const Injected = injectCommitMutation(props => {
      expect(props.isCommittingMutation).toBe(false)
      expect(typeof props.commitMutation).toBe("function")
      return <div />
    })

    mount(
      <Provider>
        <Injected />
      </Provider>
    )

    expect.assertions(2)
  })

  it("lets you commit a mutation", async () => {
    const resultFn = jest.fn()
    const Injected = injectCommitMutation(
      (props: {
        isCommittingMutation: boolean
        commitMutation: CommitMutation
        word: string
      }) => {
        return (
          <div
            className={
              props.isCommittingMutation ? "isCommittingMutation" : "nothing"
            }
            onClick={() => {
              props
                .commitMutation<commitMutationTest1Mutation>({
                  variables: {
                    input: {
                      creditCardId: "card",
                      orderId: "order",
                    },
                  },
                  mutation: graphql`
                    mutation commitMutationTest1Mutation(
                      $input: SetOrderPaymentInput!
                    ) {
                      ecommerceSetOrderPayment(input: $input) {
                        orderOrError {
                          ... on OrderWithMutationFailure {
                            error {
                              code
                            }
                          }
                        }
                      }
                    }
                  `,
                })
                .then(resultFn)
            }}
          >
            {props.word}
          </div>
        )
      }
    )

    const wrapper = mount(
      <Provider>
        <Injected word="hello" />
      </Provider>
    )
    expect(wrapper.text()).toBe("hello")
    expect(wrapper.find("div").props().className).toBe("nothing")
    wrapper.find("div").simulate("click")
    expect(wrapper.find("div").props().className).toBe("isCommittingMutation")
    expect(resultFn).not.toHaveBeenCalled()
    await flushPromiseQueue()
    wrapper.update()
    expect(wrapper.find("div").props().className).toBe("nothing")
    expect(resultFn).toHaveBeenCalledWith({
      ecommerceSetOrderPayment: {
        orderOrError: { error: { code: "invalid_state" } },
      },
    })
  })
})
