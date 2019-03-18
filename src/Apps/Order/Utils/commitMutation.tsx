import { SystemContext } from "Artsy"
import { GraphQLError } from "graphql"
import React, { useCallback, useContext, useRef, useState } from "react"
import {
  commitMutation as relayCommitMutation,
  GraphQLTaggedNode,
} from "react-relay"
import { OperationBase } from "relay-runtime"

export type CommitMutation = <MutationType extends OperationBase>(
  args: {
    mutation: GraphQLTaggedNode
    variables: MutationType["variables"]
  }
) => Promise<MutationType["response"]>

interface CommitMutationProps {
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const MutationContext = React.createContext<CommitMutationProps>({
  isCommittingMutation: false,
  commitMutation() {
    throw new Error("no mutation context in react tree")
  },
})

export const ProvideMutationContext: React.FC = ({ children }) => {
  const [isCommittingMutation, setIsComittingMutation] = useState(false)
  const { relayEnvironment } = useContext(SystemContext)
  const lastMutationPromise = useRef(Promise.resolve())

  const commitMutation: CommitMutation = useCallback(
    ({ variables, mutation }) =>
      new Promise((resolve, reject) => {
        // wait for last mutation to finish
        const mutationPromise = lastMutationPromise.current
          .catch(() => {
            return
          })
          .then(() => {
            lastMutationPromise.current = mutationPromise
            setIsComittingMutation(true)
            relayCommitMutation(relayEnvironment, {
              // tslint:disable-next-line:relay-operation-generics
              mutation,
              variables,
              onCompleted: (data, errors) => {
                setIsComittingMutation(false)
                if (errors) {
                  reject(new GraphQLError(errors.join("\n")))
                  return
                }
                resolve(data)
              },
              onError: e => {
                setIsComittingMutation(false)
                reject(e)
              },
            })
          })
      }),
    [lastMutationPromise, setIsComittingMutation]
  )

  return (
    <MutationContext.Provider value={{ commitMutation, isCommittingMutation }}>
      {children}
    </MutationContext.Provider>
  )
}

export function injectCommitMutation<Props extends CommitMutationProps>(
  Component: React.ComponentType<Props>
): React.ComponentType<
  Pick<Props, Exclude<keyof Props, keyof CommitMutationProps>>
> {
  const { isCommittingMutation, commitMutation } = useContext(MutationContext)
  return props => (
    <Component
      isCommittingMutation={isCommittingMutation}
      commitMutation={commitMutation}
      {...props}
    />
  )
}
