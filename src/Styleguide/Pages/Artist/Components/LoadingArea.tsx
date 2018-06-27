import Spinner from "Components/Spinner"
import React from "react"
import { State as PreloadLinkState } from "Router/PreloadLink"
import styled from "styled-components"
import { Subscribe } from "unstated"

export const LoadingArea = props => {
  return (
    <Subscribe to={[PreloadLinkState]}>
      {({ state: { isFetching } }: PreloadLinkState) => {
        const loaderClass = isFetching ? "loading" : ""

        return (
          <React.Fragment>
            <SpinnerToggle className={loaderClass} />
            <Container className={loaderClass}>{props.children}</Container>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

const Container = styled.div`
  opacity: 1;
  position: relative;

  transition: opacity 0.25s;

  &.loading {
    opacity: 0.1;
  }
`

const SpinnerToggle = styled(Spinner)`
  position: absolute;
  top: 100px;
  z-index: 1;

  opacity: 0;
  transition: opacity 0.2s;

  &.loading {
    opacity: 1;
  }
`
