import Spinner from "Components/Spinner"
import React from "react"
import { ReadyState, RelayContainer } from "react-relay"
import styled from "styled-components"

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export const LoadingClassName = "relay-loading"

export function renderWithLoadProgress<P>(
  Container: RelayContainer<P>,
  initialProps: object = {}
): (readyState: ReadyState<P>) => React.ReactElement<RelayContainer<P>> | null {
  // TODO: We need design for retry-ing, or the go-ahead to re-use the design of
  //       the iOS app.
  //
  // let retrying = false
  return ({ error, props, retry }) => {
    if (error) {
      const networkError = error as any
      if (networkError.response && networkError.response._bodyInit) {
        let data = networkError.response._bodyInit || "{}"
        try {
          data = JSON.parse(data)
          // tslint:disable-next-line:no-empty
        } catch (e) {}
        console.error(`Metaphysics Error: ${error.message}\n`, data)
      }

      // if (retrying) {
      //   retrying = false
      //   // TODO: Even though this code path is reached, the retry button keeps spinning. iirc it _should_ disappear when
      //   //      `onRetry` on the instance is unset.
      //   //
      //   // This will re-use the native view first created in the renderFailure callback, which means it can
      //   // continue its ‘retry’ animation.
      //   return <LoadFailureView style={{ flex: 1 }} />
      // } else {
      //   retrying = true
      //   return <LoadFailureView onRetry={retry} style={{ flex: 1 }} />
      // }
      return null
    } else if (props) {
      return <Container {...initialProps} {...props as any} />
    } else {
      return (
        <SpinnerContainer className={LoadingClassName}>
          <Spinner />
        </SpinnerContainer>
      )
    }
  }
}
