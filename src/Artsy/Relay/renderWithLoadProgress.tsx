import { Spinner } from "@artsy/palette"
import React from "react"
import { ReadyState, RelayContainer } from "react-relay"
import styled from "styled-components"

/**
 * WARNING: Do _not_ change this element to something common like a div. If the
 * element of this container is the same as the element used in the RelayContainer
 * then rehydration can fail and cause the RelayContainer to receive styles
 * from the SpinnerContainer and Spinner.
 */
const SpinnerContainer = styled.figure`
  width: 100%;
  height: 100px;
  position: relative;
`

export const LoadingClassName = "relay-loading"

const handleError = error => {
  // In tests we want errors to clearly bubble up.
  if (typeof jest !== "undefined") {
    throw error
  }

  if (error.message) {
    console.error(error.message)
  }

  const networkError = error as any
  if (networkError.response && networkError.response._bodyInit) {
    let data = networkError.response._bodyInit
    if (data) {
      try {
        data = JSON.parse(data)
        console.error(`Metaphysics Error data:`, data)
        // tslint:disable-next-line:no-empty
      } catch (e) {}
    }
  }
}

export function renderWithLoadProgress<P>(
  Container: RelayContainer<P>,
  initialProps: object = {},
  wrapperProps: object = {}
): (readyState: ReadyState<P>) => React.ReactElement<RelayContainer<P>> | null {
  return ({ error, props, retry }) => {
    if (error) {
      handleError(error)
      return null
    } else if (props) {
      return <Container {...initialProps} {...props as any} />
    } else {
      return (
        <SpinnerContainer className={LoadingClassName} {...wrapperProps}>
          <Spinner />
        </SpinnerContainer>
      )
    }
  }
}
